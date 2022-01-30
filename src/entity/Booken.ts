import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Property } from "./Property";

@Entity()
export class Booken
{
    @PrimaryColumn()
    address : string;

    @Column({ type: 'timestamptz' })
    dateFrom : Date;

    @Column({ type: 'timestamptz' })
    dateTo : Date;

    @Column()
    minAdults : Number;

    @Column()
    maxAdults : Number;

    @Column()
    property : string
}