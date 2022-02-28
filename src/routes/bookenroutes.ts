import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
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

        let date : Date = new Date();
        let booken = new Booken();
        booken.address = address;
        booken.dateFrom = dateFrom;
        booken.dateTo = dateTo;
        booken.minAdults = minAdults;
        booken.maxAdults = maxAdults;
        booken.createdDate = date;
        console.log(propertyaddress);
        booken.property = propertyaddress;
        
        await getConnection().manager.save(booken);
        console.info("Booken has been saved");

        res.json({ status : 'success' , data : "" });
    }

    async getBooken(req : Request, res : Response)
    {
        let bookens = await getConnection()
        .getRepository(Booken)
        .find();

        res.json(bookens);
    }

    routes()
    {
        this.router.post('/addbooken', this.addBooken);
        this.router.get('/bookens', this.getBooken);
    }
}

const postroutes = new BookenRoute();
export default postroutes.router;
