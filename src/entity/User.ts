import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address : string;    

    @CreateDateColumn()
    createdDate : Date;

    @Column({default: false})
    firsttime : boolean;
    
}
