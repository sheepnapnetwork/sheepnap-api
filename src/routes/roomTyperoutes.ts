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
        const {code, description, propertyAddress} = req.body;

        let roomType = new RoomType()
        roomType.code = code;
        roomType.description = description;


        let property = new Property();
        property.address = propertyAddress;

        roomType.property = property;
        

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

    async getRoomTypeByCode(req : Request, res : Response){
        let code: number = parseInt(req.params.code);
        let roomType : RoomType = await getConnection().getRepository(RoomType).findOne({code:code})

        res.json(roomType);
      
    }

    routes(){
        this.router.post('/addRoomType', this.addRoomType);
        this.router.get('/roomsTypes', this.getRoomsTypes);
        this.router.get('/roomType/:code', this.getRoomTypeByCode);

    }
}

const roomTyperoute = new RoomTypeRoute();
export default roomTyperoute.router;