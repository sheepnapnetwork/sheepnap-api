import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {User} from '../entity/User';

export default class UserRepository 
{
    async addUserRepository(address : string, firsttime: boolean)
    {
        let date : Date = new Date()
        let user = new User();
        user.address = address;
        user.firsttime = firsttime
        user.createdDate = date;

        await getConnection().manager.save(user);

        console.info("User has been saved");
    }

    async getUsersRepository()
    {
        let users = await getConnection().getRepository(User).find();
        return users;
    }

    async getUserByIdRepository(id : number)
    {
        let user : User = await getConnection().getRepository(User).findOne({where:{id:id}});
        return user;
    }
}