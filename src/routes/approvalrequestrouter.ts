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
        console.log(propertyaddress); 
        await getConnection().manager.save(approvalRequest);
        console.info("Approval request has been saved");
    }

    routes()
    {
        this.router.post('/addapprovalrequest', this.addApprovalRequest);
    }
}

const approvalRequest = new ApprovalRequestRouter();
export default approvalRequest.router;