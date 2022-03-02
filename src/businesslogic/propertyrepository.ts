import { Property } from "../entity/Property";
import { PropertyMetadata } from "../types/PropertyMetadataType";
import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import { PropertyImage } from "../entity/PropertyImage";
import { Amenity } from "../entity/Amenities";

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

    async GetPropertiesForHomePageRepository() 
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

    async GetPropertiesByApprovedDeniedRepository()
    {
        const properties = await getConnection()
            .getRepository(Property)
            .createQueryBuilder("property")
            .select(["property.name", "property.approved"])
            .where("property.approved = :approved", {approved:false})
            .orWhere("property.AprovalRequest = :AprovalRequest", {AprovalRequest:null})
            .leftJoinAndSelect("property.AprovalRequest", "propertyAprovalrequest")
            .leftJoinAndSelect("property.Images", "propertyImage")
            .getMany();

        return properties;
    }

    async GetPropertyDetailRepository(address : string)
    {
        let property = await getConnection()
            .getRepository(Property)
            .findOne({relations: ["Images"], where : { address : address } });
        
        return property;
    }

    async GetPropertiesByAddressRepository(address : string)
    {
        let property = await getConnection()
            .getRepository(Property)
            .findOne({relations: ["Images", "Amenities"], where : { address : address } });
        
        return property;
    }

    async GetPropertiesByOwnerRepository(owner : string)
    {
        let properties: Property[] = await getConnection()
            .getRepository(Property)
            .find({owner: owner});
        
        return properties;
    }
}