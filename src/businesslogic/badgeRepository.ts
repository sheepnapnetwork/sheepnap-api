import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import { Badge } from '../entity/Badge';

export default class BadgeRepository
{
    async addBadge(code: number, name : string, description : string,
        owner: string, quantity: number, src: string)
    {
        let badge = new Badge();
        badge.code = code;
        badge.name = name;
        badge.description = description;
        badge.owner = owner;
        badge.quantity = quantity;
        badge.src = src;
        
        await getConnection().manager.save(badge);
        console.info("Badge has been saved");
    }

    async getBadges()
    {
        let badges = await getConnection()
            .getRepository(Badge)
            .find();
        
        return badges;
    }

    async deleteBadge(code : number)
    {
        await getConnection()
            .getRepository(Badge)
            .createQueryBuilder()
            .delete()
            .from(Badge)
            .where("code = :code", { code: code })
            .execute();
    }
}