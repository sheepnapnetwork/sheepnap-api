import {Request, Response, Router} from 'express';
import "reflect-metadata";
import {getConnection} from 'typeorm';
import {Property} from "../entity/Property";
import {PropertyImage} from '../entity/PropertyImage';
import {PropertyMetadata} from '../types/PropertyMetadataType';
import MetadataValidator from '../businessentities/MetadataValidator';

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

            let images: PropertyImage[] = propertyMetadata.images.map((image) => {
                let propertyImage: PropertyImage = new PropertyImage();
                propertyImage.priority = image.priority;
                propertyImage.property = address;
                propertyImage.url = image.url;
                propertyImage.title = image.title;
                transactionalEntityManager.save(propertyImage);
                return propertyImage;
            });

            let property = new Property();
            property.address = address;
            property.name = propertyMetadata.name;
            property.description = propertyMetadata.description;
            property.owner = owner;
            property.active = true;
            property.approved = false;
            property.reviews = 0;
            property.MetadataReference = metadataendpoint;
            property.Images = images;
            transactionalEntityManager.save(property);
        });

        res.json({status: 'success'});

    }

    async GetProperties(req : Request, res : Response) {
        // let properties = await getConnection()
        // .getRepository(Property)
        // .find({ active : true });

        const properties = await getConnection()
        .getRepository(Property)
        .find({ relations : ["Images"]});
    
        res.json(properties);
    }

    async GetPropertyDetail(req : Request, res : Response) {
        const {address} = req.body;

        if (!address) {
            res.json({'error_message': 'provide an address'});
        }

        let property = await getConnection().getRepository(Property).findOne({address: address});

        res.json(property);
    }

    async GetPropertiesByAddress(req : Request, res : Response) {
        let address: string = req.params.address;

        let properties: Property[] = await getConnection().getRepository(Property).find({address: address});

        res.json(properties);
    }

    async GetPropertiesByOwner(req : Request, res : Response) {
        let owner: string = req.params.owner;

        let properties: Property[] = await getConnection().getRepository(Property).find({owner: owner});

        res.json(properties);
    }

    routes() {
        this.router.post('/validate', this.validateMetadataEndpoint);
        this.router.get('/properties', this.GetProperties);
        this.router.post('/property', this.GetPropertyDetail);
        this.router.get('/properties/:address', this.GetPropertiesByAddress);
        this.router.get('/properties/:owner', this.GetPropertiesByOwner);
        this.router.post('/addproperty', this.AddProperty);
        this.router.post('/search', this.SearchProperties);
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
