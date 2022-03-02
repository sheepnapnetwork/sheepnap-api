import {Request, Response, Router} from 'express';
import "reflect-metadata";
import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {Property} from "../entity/Property";
import {PropertyMetadata} from '../types/PropertyMetadataType';
import MetadataValidator from '../businessentities/MetadataValidator';
import PropertyRepository from '../businesslogic/propertyrepository';

class PropertyRoute {
    router : Router;
    //metaDataValidator : MetadataValidator;

    constructor() {
        //this.metaDataValidator = new MetadataValidator();
        this.router = Router();
        this.routes();
        
    }

    async SearchProperties(req : Request, res : Response) {
        const {checkin, checkout, destination, adults} = req.body;
        res.json([]);
    }

    async AddProperty(req : Request, res : Response) {
        const {address, owner, metadataendpoint} = req.body;

        let metaDataValidator = new MetadataValidator();
        metaDataValidator.validateMetadata(metadataendpoint)
        .then(async (propertyMetadata : PropertyMetadata) => 
        {
            let propertyRepository = new PropertyRepository();
            await propertyRepository.AddPropertyMetadata(propertyMetadata, address, owner, metadataendpoint);
            res.json({status: 'success'});
        })
        .catch((error : Error) => 
        {
            res.json({status: error.message});
        });
    }

    async GetPropertiesForHomePage(req : Request, res : Response) {

        const properties = await getConnection()
            .getRepository(Property)
            .createQueryBuilder()
            .select(["p.name", "p.address"])
            .from(Property, "p")
            .leftJoinAndSelect("p.Images", "propertyImage")
            .getMany();
        
        res.json(properties);
    }

    async GetPropertiesByApprovedDenied(req : Request, res : Response) {

        const properties = await getConnection()
            .getRepository(Property)
            .createQueryBuilder("property")
            .select(["property.name", "property.approved"])
            .where("property.approved = :approved", {approved:false})
            .leftJoinAndSelect("property.AprovalRequest", "propertyAprovalrequest")
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

    async validateMetadataEndpoint(req : Request, res : Response) {
        const {metadataendpoint} = req.body;
        
        let metaDataValidator = new MetadataValidator();

        try
        {
            await metaDataValidator.validateMetadata(metadataendpoint);
            return res.json({error: false, message: ''});
        }
        catch(error)
        {  
            return res.json({error: true, message: error.message});
        }        
    }

    routes() {
        this.router.post('/validate', this.validateMetadataEndpoint);
        this.router.get('/propertieshomepage', this.GetPropertiesForHomePage);
        this.router.get('/propertiesapproveddenied', this.GetPropertiesByApprovedDenied);
        this.router.get('/property/:address', this.GetPropertiesByAddress);
        this.router.get('/properties/owner/:owner', this.GetPropertiesByOwner);
        this.router.post('/addproperty', this.AddProperty);
        this.router.post('/search', this.SearchProperties);
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
