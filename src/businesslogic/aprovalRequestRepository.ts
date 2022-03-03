import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import {ApprovalRequest} from '../entity/ApprovalRequest';
import { Property } from '../entity/Property';
export default class AprovalRequestRepository
{
    async addApprovalRequestRepository(status: string, description: string, property: string)
    {
        let approvalRequest = new ApprovalRequest();
        approvalRequest.description = description;
        approvalRequest.status = status;

        let propertyToAdd = new Property();
        propertyToAdd.address = property

        approvalRequest.property = propertyToAdd;

        await getConnection().manager.save(approvalRequest);
        console.info("Approval request has been saved");
    }

    async getAprovalRequestsRepository()
    {
        let aprovalRequest = await getConnection()
        .getRepository(ApprovalRequest)
        .find({relations:["property"]})

        return aprovalRequest;
    }

    async changeStatusAprovalRequestRepository(id: number, status: string)
    {
        await getConnection()
        .createQueryBuilder()
        .update(ApprovalRequest)
        .set({ status: status })
        .where("id = :id", { id: id })
        .execute();
    }
}