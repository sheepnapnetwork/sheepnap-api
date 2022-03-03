import { Request, Response, Router } from 'express';
import { Result } from 'ts-postgres/dist/src/result';
import { getConnection } from 'typeorm';
import AprovalRequestRepository from '../businesslogic/aprovalRequestRepository';
import { ApprovalRequest } from "../entity/ApprovalRequest";
import { Property } from '../entity/Property';

class ApprovalRequestRouter
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    async addApprovalRequest(req : Request, res : Response)
    {
        const {status, description, property} = req.body;

        let aprovalRequestRepository = new AprovalRequestRepository();
        await aprovalRequestRepository.addApprovalRequestRepository(status, description, property);

        res.json({ status : 'success' , data : "" });
    }

    async getAprovalRequests(req : Request, res : Response)
    {
        let aprovalRequestRepository = new AprovalRequestRepository();
        let aprovalRequestToGet = await aprovalRequestRepository.getAprovalRequestsRepository();

        res.json(aprovalRequestToGet);
    }

    async changeStatusAprovalRequest(req : Request, res : Response){
        const idToCahnge : number = parseInt(req.params.id);
        const statusToChange : string = req.body.status;

        let aprovalRequestRepository = new AprovalRequestRepository();
        await aprovalRequestRepository
            .changeStatusAprovalRequestRepository(idToCahnge, statusToChange)

        res.json({ status : 'success' , data : "" });

    }

    routes()
    {
        this.router.post('/addapprovalrequest', this.addApprovalRequest);
        this.router.get('/getaprovalrequests', this.getAprovalRequests);
        this.router.put('/changestatusaprovalrequest/:id', this.changeStatusAprovalRequest);
    }
}

const approvalRequest = new ApprovalRequestRouter();
export default approvalRequest.router;