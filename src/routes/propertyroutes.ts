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
        const { checkin, checkout, destination, adults } = req.body;
        res.json([]);
    }

    async addProperty(req : Request, res : Response)
    {
        const { address, name, description } = req.body;

        let property = new Property();
        property.address = address;
        property.name = name;
        property.description = description;
        
        await getConnection().manager.save(property);
        console.info("Property has been saved");

        res.json({ status : 'success' , data : "" });
    }

    async getProperties(req: Request, res : Response)
    {
        let properties = await getConnection()
            .getRepository(Property)
            .find();

        res.json(properties);
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
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
