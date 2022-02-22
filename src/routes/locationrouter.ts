import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { Location } from '../entity/Location';

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
        let location = await getConnection().getRepository(Location).find()
        res.json(location);
    }

    async addLocation(req : Request, res : Response)
    {
        const {address , location} = req.body;

        let locations = new Location()
        locations.address = address;
        locations.location = location;

        await getConnection().manager.save(locations);
        console.info("Location has been saved");

        res.json({status : res.status, data : ""});
    }

    routes()
    {
        this.router.get('/getlocations', this.getLocations);
        this.router.get('/addlocations', this.addLocation);
    }
}

const locationroutes = new LocationRoute();
export default locationroutes.router;