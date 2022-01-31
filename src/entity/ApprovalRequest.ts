import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class ApprovalRequest
{   
    @Column({ length:1000 })
    description : string;

    @Column()
    property : string
}