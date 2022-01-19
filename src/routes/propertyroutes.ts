import { Request, Response, Router } from 'express';
import Property from '../models/Property';
import Booken from '../models/Booken';

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
        const posts = await Property.find();

        //filter by date
        var bookens = Booken.find({
            datefrom: 
            {
                $gte: new Date(2012, 7, 14), 
                $lt: new Date(2012, 7, 15)
            },
            adults : 
            {
                $lt : adults 
            },
        });
        

        res.json(posts);
    }

    async addProperty(req : Request, res : Response)
    {
        const { name, description } = req.body;
        const newProperty =  new Property({ name, description });
        await newProperty.save();
        res.json({status : res.status, data : newProperty});
    }

    routes()
    {
        this.router.post('/addproperty', this.addProperty);
        this.router.post('/search', this.SearchProperties);  
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
