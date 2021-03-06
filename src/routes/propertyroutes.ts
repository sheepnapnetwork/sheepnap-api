import {Request, Response, Router} from 'express';
import "reflect-metadata";
import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {Property} from "../entity/Property";
import {PropertyMetadata} from '../types/PropertyMetadataType';
import MetadataValidator from '../businessentities/MetadataValidator';
import PropertyRepository from '../businesslogic/propertyRepository';

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

    async GetPropertiesForHomePage(req : Request, res : Response) 
    {
        let propertyRepository = new PropertyRepository();
        let properties = await propertyRepository.GetPropertiesForHomePage()
        
        res.json(properties);
    }

    async GetPropertiesByApprovedDenied(req : Request, res : Response) 
    {
        let owner: string = req.params.owner.toLowerCase();

        let propertyRepository = new PropertyRepository();
        let propertiesDenied = await propertyRepository.GetPropertiesByApprovedDenied(owner)
        
        res.json(propertiesDenied);
    }

    async GetPropertyDetail(req : Request, res : Response) {
        const {address} = req.body;

        if (!address) {
            res.json({'error_message': 'provide an address'});
        }

        let propertyRepository = new PropertyRepository();
        let propertyDetail = await propertyRepository.GetPropertyDetail(address); 

        res.json(propertyDetail);
    }

    async GetPropertiesByAddress(req : Request, res : Response) {
        let address: string = req.params.address;
        
        let propertyRepository = new PropertyRepository();
        let propertyAddress = await propertyRepository.GetPropertiesByAddress(address);

        res.json(propertyAddress);
    }

    async GetPropertiesByOwner(req : Request, res : Response) {
        let owner: string = req.params.owner.toLowerCase();

        let propertyRepository = new PropertyRepository();
        let propertyOwner = await propertyRepository.GetPropertiesByOwner(owner);
            
        res.json(propertyOwner);
    }

    async GetPropertiesByMonth(req : Request, res : Response) 
    {
        let propertyRepository = new PropertyRepository();
        let properties = await propertyRepository.GetPropertiesByMonth();
        
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
        this.router.get('/propertydetail', this.GetPropertyDetail);
        this.router.get('/propertieshomepage', this.GetPropertiesForHomePage);
        this.router.get('/propertiesapproveddenied/:owner', this.GetPropertiesByApprovedDenied);
        this.router.get('/property/:address', this.GetPropertiesByAddress);
        this.router.get('/properties/owner/:owner', this.GetPropertiesByOwner);
        this.router.get('/propertiesbymonth', this.GetPropertiesByMonth);
        this.router.post('/addproperty', this.AddProperty);
        this.router.post('/search', this.SearchProperties);
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
