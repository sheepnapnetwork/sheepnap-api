import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
//import {roomType} from '../entity/RoomType'; 

class RoomTypeRoute{
    router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async addRoomType(req : Request, res : Response){

    }

    async getRoomsTypes(req : Request, res : Response){
        
    }

    async getRoomType(req : Request, res : Response){
        
    }

    routes(){

    }


}