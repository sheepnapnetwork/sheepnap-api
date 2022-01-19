import { Request, Response, Router } from 'express';
import Location from '../models/Location';

class LocationRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    async getLocations(req : Request, res : Response)
    {
        const locations = await Location.find();
        res.json(locations);
    }

    async addLocation(req : Request, res : Response)
    {
        const { name, description } = req.body;
        const newProperty =  new Location({ name, description });
        await newProperty.save();
        res.json({status : res.status, data : newProperty});
    }

    routes()
    {
        this.router.get('/getlocations', this.getLocations);
    }
}

const locationroutes = new LocationRoute();
export default locationroutes.router;