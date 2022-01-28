import { Request, Response, Router } from 'express';

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
