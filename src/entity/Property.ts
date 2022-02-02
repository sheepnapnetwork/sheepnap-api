import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Property
{
    @PrimaryColumn()
    address: string;

    @Column({ length:500 })
    owner : string;
    
    @Column({ length:200 })
    name : string;

    @Column({ length:500 })
    description : string;
}