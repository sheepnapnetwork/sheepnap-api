import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Waitlist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isPropertyOwner : boolean;

    @Column()
    marketingEmails : boolean;

    @Column()
    email : string;
    
}
