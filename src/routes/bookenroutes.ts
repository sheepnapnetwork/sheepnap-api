import { Request, Response, Router } from 'express';
import Property from '../models/Property';

class BookenRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    routes()
    {
    }
}

const postroutes = new PropertyRoute();
export default postroutes.router;
