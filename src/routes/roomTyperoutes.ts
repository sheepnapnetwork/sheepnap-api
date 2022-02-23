import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import { Property } from '../entity/Property';
import { RoomType } from '../entity/RoomType';
 

class RoomTypeRoute{
    router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async addRoomType(req : Request, res : Response){
        const {code, description, property} = req.body;

        let roomType = new RoomType()
        roomType.code = code;
        roomType.description = description;


        let properties = new Property();
        properties.address = property;

        roomType.property = properties;
        

        await getConnection().manager.save(roomType);
        console.info("roomType has been saved");

        res.json({ status : 'success' , data : "" });

    }

    async getRoomsTypes(req : Request, res : Response){
        let roomType = await getConnection()
            .getRepository(RoomType)
            .find();

        res.json(roomType)
        
    }

    async getRoomTypeByAddress(req : Request, res : Response){
        let address: string= req.params.property

        let roomType : RoomType []  = await getConnection()
            .getRepository(RoomType)
            .createQueryBuilder("roomType")
            .where("roomType.propertyAddress = :propertyAddress", { propertyAddress: address }).execute();

        res.json(roomType);
      
    }

    routes(){
        this.router.post('/addRoomType', this.addRoomType);
        this.router.get('/roomsTypes', this.getRoomsTypes);
        this.router.get('/roomType/:property', this.getRoomTypeByAddress);

    }
}

const roomTyperoute = new RoomTypeRoute();
export default roomTyperoute.router;