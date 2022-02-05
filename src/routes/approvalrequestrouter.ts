import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { ApprovalRequest } from "../entity/ApprovalRequest";

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
        const { 
            propertyaddress,
            description
        } = req.body;

        let approvalRequest = new ApprovalRequest();
        approvalRequest.property = propertyaddress;
        approvalRequest.description = description;
        approvalRequest.active = true;
        approvalRequest.startdate = new Date();
        approvalRequest.enddate = new Date();
        approvalRequest.totalvoters = 0;
        

        console.log(propertyaddress); 
        await getConnection().manager.save(approvalRequest);
        res.json({ 'status' : 'success' });
    }

    async getApprovalRequests(req : Request, res : Response)
    {
        let approvalRequest = await getConnection()
            .getRepository(ApprovalRequest)
            .find();

        res.json(approvalRequest);
    }

    routes()
    {
        this.router.post('/addapprovalrequest', this.addApprovalRequest);
        this.router.get('/approvalrequests', this.getApprovalRequests);
    }
}

const approvalRequest = new ApprovalRequestRouter();
export default approvalRequest.router;