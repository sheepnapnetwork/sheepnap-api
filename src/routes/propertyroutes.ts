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
        const { name } = req.body;

        let property = new Property();
        property.name = name;
        getConnection().manager.save(property);
        console.log("Property has been saved");
        res.json({status : res.status, data : ""});
    }

    routes()
    {
        this.router.post('/addproperty', this.addProperty);
        this.router.post('/search', this.SearchProperties);  
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
