import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ApprovalRequest
{   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length:1000 })
    description : string;

    @Column()
    property : string
}