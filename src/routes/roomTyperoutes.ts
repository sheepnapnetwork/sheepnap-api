import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import RoomTypeRepository from '../businesslogic/roomTypeRepository';
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

        let roomTypePropertyRepository = new RoomTypeRepository();
        await roomTypePropertyRepository.addRoomTypeRepository(code, description, property)

        res.json({ status : 'success' , data : "" });
    }

    async getRoomsTypes(req : Request, res : Response){
        
        let roomTypePropertyRepository = new RoomTypeRepository();
        let roomsTypesToGet = await roomTypePropertyRepository.getRoomsTypesRepository();

        res.json(roomsTypesToGet);
    }

    async getRoomTypeByAddress(req : Request, res : Response){
        let address: string= req.params.property

        let roomTypePropertyRepository = new RoomTypeRepository();
        let roomsTypesByAddress = await roomTypePropertyRepository.getRoomTypeByAddressRepository(address);

        res.json(roomsTypesByAddress);
    }

    routes(){
        this.router.post('/addRoomType', this.addRoomType);
        this.router.get('/roomsTypes', this.getRoomsTypes);
        this.router.get('/roomType/:property', this.getRoomTypeByAddress);
    }
}

const roomTyperoute = new RoomTypeRoute();
export default roomTyperoute.router;