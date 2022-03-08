import { Property } from "../entity/Property";
import { PropertyMetadata } from "../types/PropertyMetadataType";
import {EntityManager, getConnection, getRepository, SelectQueryBuilder, ViewEntity} from 'typeorm';
import { PropertyImage } from "../entity/PropertyImage";
import { Amenity } from "../entity/Amenities";
import { View } from "typeorm/schema-builder/view/View";
import { ViewPropertiesByMonth } from "../entity/viewPropertiesByMonth";
import {getManager} from "typeorm";

export default class PropertyRepository
{
    async AddPropertyMetadata(propertyMetadata : PropertyMetadata, 
        address : string
        , owner : string
        , metadataendpoint : string)
    {
        await getConnection().transaction(async transactionalEntityManager => {

            let date: Date = new Date();
            let property = new Property();
            property.address = address;
            property.name = propertyMetadata.name;
            property.description = propertyMetadata.description;
            property.owner = owner;
            property.createdDate = date;
            property.active = true;
            property.approved = false;
            property.reviews = 0;
            property.metadatareference = metadataendpoint;
            
            await transactionalEntityManager.save(property);

            propertyMetadata.images.forEach(async (image) => 
            {
                let propertyImage: PropertyImage = new PropertyImage();
                propertyImage.priority = image.priority;
                propertyImage.property = property;
                propertyImage.url = image.url;
                propertyImage.title = image.title;
                await transactionalEntityManager.save(propertyImage);
            });

            propertyMetadata.amenities.forEach(async (amenitie)=>{

                let amenitieTosave : Amenity = new Amenity();
                amenitieTosave.code = amenitie.code;
                amenitieTosave.name = amenitie.name;
                amenitieTosave.property = property;
                await transactionalEntityManager.save(amenitieTosave);
            });
        });
    }

    async GetPropertiesForHomePage() 
    {
        const properties = await getConnection()
        .getRepository(Property)
        .createQueryBuilder()
        .select(["p.name", "p.address", "p.pricefrom"])
        .from(Property, "p")
        .leftJoinAndSelect("p.Images", "propertyImage")
        .getMany();

        return properties;
    }

    async GetPropertiesByApprovedDenied(ownerDenied: string)
    {

        const properties = await getConnection()
            .getRepository(Property)
            .createQueryBuilder("property")
            .select(["property.name", "property.approved", "property.address"])
            .where("property.owner = :owner", {owner: ownerDenied})
            .andWhere("property.approved = :approved", {approved: false})
            .orWhere("property.AprovalRequest = :AprovalRequest", {AprovalRequest:null})
            .leftJoinAndSelect("property.AprovalRequest", "propertyAprovalrequest")
            .getMany();

        return properties;
    }

    async GetPropertyDetail(address : string)
    {
        let property = await getConnection()
            .getRepository(Property)
            .findOne({relations: ["Images"], where : { address : address } });
        
        return property;
    }

    async GetPropertiesByAddress(address : string)
    {
        let property = await getConnection()
            .getRepository(Property)
            .findOne({relations: ["Images", "Amenities"], where : { address : address } });
        
        return property;
    }

    async GetPropertiesByOwner(owner : string)
    {
        let properties: Property[] = await getConnection()
            .getRepository(Property)
            .find({owner: owner});
        
        return properties;
    }

    async GetPropertiesByMonth()
    {
        const entityManager = getManager();
        const properties = await entityManager.find(ViewPropertiesByMonth)

        //console.log("view nestor: ", properties)
        
        return properties;
    }
}