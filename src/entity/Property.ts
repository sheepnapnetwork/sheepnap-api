import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Property
{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        length:200
    })

    name : string;
}