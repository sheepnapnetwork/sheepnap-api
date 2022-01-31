import { Request, Response, Router } from 'express';

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
        res.json([]);
    }

    async addLocation(req : Request, res : Response)
    {
        res.json({status : res.status, data : ""});
    }

    routes()
    {
        this.router.get('/getlocations', this.getLocations);
    }
}

const locationroutes = new LocationRoute();
export default locationroutes.router;