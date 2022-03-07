import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {Booken} from '../entity/Booken';

export default class BookenRepository
{
    async addBookenRepository( address: string, dateFrom: Date, dateTo: Date, 
        minAdults: number, maxAdults: number , propertyaddress: string)
    {
        let date : Date = new Date();
        let booken = new Booken();
        booken.address = address;
        booken.dateFrom = dateFrom;
        booken.dateTo = dateTo;
        booken.minAdults = minAdults;
        booken.maxAdults = maxAdults;
        booken.createdDate = date;
        booken.property = propertyaddress;
        
        await getConnection().manager.save(booken);
        console.info("Booken has been saved");
    }

    async getBookensRepository()
    {
        let bookens = await getConnection().getRepository(Booken).find();
        return bookens;
    }
}