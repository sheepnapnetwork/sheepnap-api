import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import { Property } from '../entity/Property';
import {RoomType} from '../entity/RoomType';

export default class RoomTypeRepository
{

    async addRoomTypeRepository(code : number, description : string, property : string){

        let roomType = new RoomType()
        roomType.code = code;
        roomType.description = description;

        let properties = new Property();
        properties.address = property;

        roomType.property = properties;
        

        await getConnection().manager.save(roomType);
        console.info("roomType has been saved");

        return properties
    }

    async getRoomsTypesRepository()
    {
        let roomType = await getConnection()
            .getRepository(RoomType)
            .find();

        return roomType;
    }

    async getRoomTypeByAddressRepository(address : string)
    {
        let roomType : RoomType []  = await getConnection()
            .getRepository(RoomType)
            .createQueryBuilder("roomType")
            .where("roomType.propertyAddress = :propertyAddress", { propertyAddress: address }).execute();

        return roomType;
    }

}