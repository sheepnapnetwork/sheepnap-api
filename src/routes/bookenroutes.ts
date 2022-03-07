import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import BookenRepository from '../businesslogic/booken';
import { Booken } from "../entity/Booken";
import { Property } from '../entity/Property';

class BookenRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    async addBooken(req : Request, res : Response)
    {
        const { 
            address, 
            dateFrom, 
            dateTo, 
            minAdults, 
            maxAdults, 
            propertyaddress 
        } = req.body;

       let bookenRepository = new BookenRepository();
       await bookenRepository.addBookenRepository(address, dateFrom, dateTo, 
                        minAdults, maxAdults, propertyaddress);

        res.json({ status : 'success' , data : "" });
    }

    async getBooken(req : Request, res : Response)
    {
        let bookenRepository = new BookenRepository();
        let bookensToGet =  await bookenRepository.getBookensRepository();

        res.json(bookensToGet);
    }

    routes()
    {
        this.router.post('/addbooken', this.addBooken);
        this.router.get('/bookens', this.getBooken);
    }
}

const postroutes = new BookenRoute();
export default postroutes.router;
