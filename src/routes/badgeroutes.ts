import { Request, Response, Router } from 'express';
import "reflect-metadata";
import { getConnection } from 'typeorm';
import BadgeRepository from '../businesslogic/badgeRepository';
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

        let badgeRepository = new BadgeRepository();
        await badgeRepository.addBadgeRepository(code, name, description, owner, quantity, src);

        res.json({ status : 'success' , data : "" });
    }

    async getBadges(req: Request, res : Response)
    {
        let badgeRepository = new BadgeRepository();
        let badgesToGet = await badgeRepository.getBadgesRepository();

        res.json(badgesToGet);
    }

    async deleteBadge(req: Request, res : Response)
    {
        const codeTodelete: number = parseInt(req.params.code); 

        let badgeRepository = new BadgeRepository();
        await badgeRepository.deleteBadgeRepository(codeTodelete);
        
        res.json({ status : 'success' , data : "" });
    }

    routes()
    {
        this.router.get('/badge', this.getBadges);
        this.router.post('/addbadge', this.addBadge);
        this.router.delete('/deletebadge/:code', this.deleteBadge);
    }
}

const badgeroute = new BadgeRoute();
export default badgeroute.router;
