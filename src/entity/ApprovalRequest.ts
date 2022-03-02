import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Property } from "./Property";

@Entity()
export class ApprovalRequest
{   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length:1000 })
    description : string;

    @Column()
    status : string

    @OneToOne(() => Property, property => property.AprovalRequest)
    property: Property;

    
}