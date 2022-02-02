import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { Waitlist } from "../entity/Waitlist";

class WaitlistRoute
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    async addUserToWaitlist(req : Request, res : Response)
    {
        interface WaitlistUser{
            email : string,
            marketingEmails : boolean,
            isPropertyOwner : boolean
        }

        let request : WaitlistUser = req.body;

        let waitlist : Waitlist = new Waitlist();
        waitlist.email = request.email;
        waitlist.marketingEmails = request.marketingEmails;
        waitlist.isPropertyOwner = request.isPropertyOwner;
        
        getConnection().manager.save(waitlist)
        .then((value) => {
            console.info("Waitlist record has been saved");
            res.json({status : res.status, data : ""});
        })
        .catch((err) => {
            console.info("Error " + err);
            res.json({ status : 'error', message : 'an error has ocurred' });
        });
    }

    routes()
    {
        this.router.post('/adduser', this.addUserToWaitlist);
    }
}

const waitlistrouter = new WaitlistRoute();
export default waitlistrouter.router;