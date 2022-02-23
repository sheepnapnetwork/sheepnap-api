import { Request, Response, Router } from 'express';
import { Geometry } from 'geojson';
import { getConnection, getMongoRepository } from 'typeorm';
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
        const {address , dataPoint} = req.body;

        let geography = new Location()
        geography.address = address;
        geography.dataPoint = dataPoint; 

        //locations.location = location;

        await getConnection().manager.save(geography);
        console.info("Location has been saved");

        res.json({status : res.status, data : ""});
    }

    routes()
    {
        this.router.get('/getlocations', this.getLocations);
        this.router.post('/addlocations', this.addLocation);
    }
}

const locationroutes = new LocationRoute();
export default locationroutes.router;