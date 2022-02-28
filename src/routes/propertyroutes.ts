import {Request, Response, Router} from 'express';
import "reflect-metadata";
import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {Property} from "../entity/Property";
import {PropertyImage} from '../entity/PropertyImage';
import {PropertyMetadata} from '../types/PropertyMetadataType';
import MetadataValidator from '../businessentities/MetadataValidator';
import { Amenity } from '../entity/Amenities';

class PropertyRoute {
    router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async SearchProperties(req : Request, res : Response) {
        const {checkin, checkout, destination, adults} = req.body;
        res.json([]);
    }

    async validateMetadataEndpoint(req : Request, res : Response) {
        const {metadataendpoint} = req.body;

        //TODO : class need to be a private prop because is used in several parts.
        let metaDataValidator = new MetadataValidator();
        let propertyMetadata : PropertyMetadata = await metaDataValidator.validateMetadata(metadataendpoint);

        if (!propertyMetadata) {
            res.json({error: true, message: "an error has ocurred"});
        }

        return res.json({error: false, message: ''});
    }

    async AddProperty(req : Request, res : Response) {
        const {address, owner, metadataendpoint} = req.body;

        let metaDataValidator = new MetadataValidator();
        let propertyMetadata: PropertyMetadata = await metaDataValidator.validateMetadata(metadataendpoint);

        // Read metadata from external service
        // validate JSON has the proper structure
        if (!propertyMetadata) {
            res.json({ error : true });
            return;
        }

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
            })

        });

        res.json({status: 'success'});

    }

    async GetPropertiesForHomePage(req : Request, res : Response) {

        const properties = await getConnection()
            .getRepository(Property)
            .createQueryBuilder()
            .select("property.name", "property.address")
            .from(Property, "property")   
            .leftJoinAndSelect("property.Images", "propertyImage")
            .getMany();
        
        res.json(properties);
    }

    async GetPropertyDetail(req : Request, res : Response) {
        const {address} = req.body;

        if (!address) {
            res.json({'error_message': 'provide an address'});
        }

        let property = await getConnection()
            .getRepository(Property)
            .findOne({relations: ["Images"], where : { address : address } });

        res.json(property);
    }

    async GetPropertiesByAddress(req : Request, res : Response) {
        let address: string = req.params.address;
        
        let property = await getConnection()
            .getRepository(Property)
            .findOne({relations: ["Images", "Amenities"], where : { address : address } });

        res.json(property);
    }

    async GetPropertiesByOwner(req : Request, res : Response) {
        let owner: string = req.params.owner;

        let properties: Property[] = await getConnection()
            .getRepository(Property)
            .find({owner: owner});
            
        res.json(properties);
    }

    routes() {
        this.router.post('/validate', this.validateMetadataEndpoint);
        this.router.get('/propertieshomepage', this.GetPropertiesForHomePage);
        this.router.get('/property/:address', this.GetPropertiesByAddress);
        this.router.get('/properties/owner/:owner', this.GetPropertiesByOwner);
        this.router.post('/addproperty', this.AddProperty);
        this.router.post('/search', this.SearchProperties);
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
