import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

@Entity()
export class ApprovalRequest
{   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length:1000 })
    description : string;

    @Column()
    property : string

    @Column()
    startdate : Date

    @Column()
    enddate : Date

    @Column()
    active : boolean

    @Column()
    totalvoters : Number
    
}