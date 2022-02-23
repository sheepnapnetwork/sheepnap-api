import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import { User } from '../entity/User';


class UserRoute{

    router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async addUser(req : Request, res: Response){
        const {address} = req.body;

        let user = new User();
        user.address = address;

        await getConnection().manager.save(user);

        console.info("User has been saved");

        res.json({ status : 'success' , data : "" });

    }

    async getUsers(req : Request, res: Response){
        let user = await getConnection().getRepository(User).find();

        res.json(user);
    }

    async getUserById(req : Request, res: Response){
        const id : number = parseInt(req.params.id);
        let users : User = await getConnection().getRepository(User).findOne({where:{id:id}});

        res.json(users);
        
    }


    routes(){
        this.router.post('/adduser', this.addUser);
        this.router.get('/users', this.getUsers);
        this.router.get('/usersbyid/:id', this.getUserById);
    }

}

const userroute = new UserRoute();
export default userroute.router;

