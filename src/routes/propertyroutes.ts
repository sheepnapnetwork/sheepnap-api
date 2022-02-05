import { Request, Response, Router } from 'express';
import "reflect-metadata";
import { getConnection } from 'typeorm';
import { Property } from "../entity/Property";


class PropertyRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    async SearchProperties(req : Request, res : Response)
    {
        const { checkin, checkout, destination, adults, childs } = req.body;

        const { owner } = req.body;
        let propertiesByAddress : Property[] = await getConnection()
            .getRepository(Property)
            .find({ owner : owner });

        res.json(propertiesByAddress);
    }

    async addProperty(req : Request, res : Response)
    {
        const { address, name, description, owner } = req.body;

        let property = new Property();
        property.address = address;
        property.name = name;
        property.description = description;
        property.owner = owner;
        
        await getConnection().manager.save(property);
        console.info("Property has been saved");

        res.json({ status : 'success' });
    }

    async getProperties(req: Request, res : Response)
    {
        let properties = await getConnection()
            .getRepository(Property)
            .find();

        res.json(properties);
    }

    async getPropertiesByAddress(req : Request, res : Response)
    {
        let owner : string = req.params['owner'];
        console.log(owner);
        let propertiesByAddress : Property[] = await getConnection()
            .getRepository(Property)
            .find({ owner : owner });
        
        res.json(propertiesByAddress);
    }

    async getPropertyDetail(req : Request, res : Response)
    {
        const { address } = req.body;

        let property = await getConnection()
            .getRepository(Property)
            .findOne({ address : address })

        res.json(property);
    }


    routes()
    {
        this.router.post('/property', this.getPropertyDetail);
        this.router.get('/properties', this.getProperties);
        this.router.post('/addproperty', this.addProperty);
        this.router.post('/search', this.SearchProperties); 
        this.router.get('/propertybyaddress/:owner', this.getPropertiesByAddress); 
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
