import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {Location} from '../entity/Location';


export default class LocationRepository
{
    async addLocatio(address : number, dataPoint : string)
    {
        let geography = new Location()
        geography.address = address;
        geography.dataPoint = dataPoint; 

        await getConnection().manager.save(geography);
        console.info("Location has been saved");
    }

    async getLocations(){
        let locations = await getConnection().getRepository(Location).find()
        return locations;
    }

}