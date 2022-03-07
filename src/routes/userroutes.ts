import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import UserRepository from '../businesslogic/user';
import { User } from '../entity/User';


class UserRoute{

    router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async addUser(req : Request, res: Response){
        const {address, firsttime} = req.body;

        let userRepository = new UserRepository();
        await userRepository.addUserRepository(address, firsttime);

        res.json({ status : 'success' , data : "" });
    }

    async getUsers(req : Request, res: Response)
    {
        let userRepository = new UserRepository();
        let userToGet = await userRepository.getUsersRepository();

        res.json(userToGet);
    }

    async getUserById(req : Request, res: Response){
        const id : number = parseInt(req.params.id);
        
        let userRepository = new UserRepository();
        let userById = await userRepository.getUserByIdRepository(id);

        res.json(userById);
    }


    routes(){
        this.router.post('/adduser', this.addUser);
        this.router.get('/users', this.getUsers);
        this.router.get('/usersbyid/:id', this.getUserById);
    }

}

const userroute = new UserRoute();
export default userroute.router;

