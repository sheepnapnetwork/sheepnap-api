import { Request, Response, Router } from 'express';
import { Result } from 'ts-postgres/dist/src/result';
import { getConnection } from 'typeorm';
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

        let approvalRequest = new ApprovalRequest();
        approvalRequest.description = description;
        approvalRequest.status = status;

        let propertyToAdd = new Property();
        propertyToAdd.address = property

        approvalRequest.property = propertyToAdd;
        //console.log(propertyaddress); 
        await getConnection().manager.save(approvalRequest);
        console.info("Approval request has been saved");

        res.json({ status : 'success' , data : "" });
    }

    async getAprovalRequests(req : Request, res : Response){
        let aprovalRequest = await getConnection()
        .getRepository(ApprovalRequest)
        .find({relations:["property"]})
        
        res.json(aprovalRequest)
    }

    async changeStatusAprovalRequest(req : Request, res : Response){
        const idToCahnge : number = parseInt(req.params.id);
        const statusToChange : string = req.body.status;

        await getConnection()
            .createQueryBuilder()
            .update(ApprovalRequest)
            .set({ status: statusToChange })
            .where("id = :id", { id: idToCahnge })
            .execute();

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