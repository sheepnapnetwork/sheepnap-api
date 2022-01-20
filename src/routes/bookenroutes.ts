import { Request, Response, Router } from 'express';
import Property from '../models/Stay';

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

const postroutes = new BookenRoute();
export default postroutes.router;
