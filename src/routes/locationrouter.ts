import { Request, Response, Router } from 'express';
import { Geometry } from 'geojson';
import { getConnection, getMongoRepository } from 'typeorm';
import LocationRepository from '../businesslogic/locationRepository';
import { Location } from '../entity/Location';

class LocationRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    async addLocation(req : Request, res : Response)
    {
        const {address , dataPoint} = req.body;
        let locationRepository = new LocationRepository();
        await locationRepository.addLocatio(address, dataPoint);
        
        res.json({status : res.status, data : ""});
    }

    async getLocations(req : Request, res : Response)
    {
        let locationRepository = new LocationRepository();
        let locations = await locationRepository.getLocations();
        
        res.json(locations);
    }

    routes()
    {
        this.router.get('/getlocations', this.getLocations);
        this.router.post('/addlocations', this.addLocation);
    }
}

const locationroutes = new LocationRoute();
export default locationroutes.router;