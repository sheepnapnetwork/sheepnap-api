import { Request, Response, Router } from 'express';
import "reflect-metadata";
import { getConnection } from 'typeorm';
import {Badge} from '../entity/Badge';


class BadgeRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }


    async addBadge(req : Request, res : Response)
    {
        const { code, name,description, owner, quantity, src } = req.body;

        let badge = new Badge();
        badge.code = code;
        badge.name = name;
        badge.description = description;
        badge.owner = owner;
        badge.quantity = quantity;
        badge.src = src;
        
        await getConnection().manager.save(badge);
        console.info("Badge has been saved");

        res.json({ status : 'success' , data : "" });
    }

    async getBadges(req: Request, res : Response)
    {
        let badges = await getConnection()
            .getRepository(Badge)
            .find();

        res.json(badges);
    }


    routes()
    {
        this.router.get('/badge', this.getBadges);
        this.router.post('/addbadge', this.addBadge);

    }
}

const badgeroute = new BadgeRoute();
export default badgeroute.router;
