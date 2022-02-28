import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne, CreateDateColumn } from "typeorm";

@Entity()
export class Booken
{
    @PrimaryColumn()
    address : string;

    @Column({ type: 'timestamptz' })
    dateFrom : Date;

    @Column({ type: 'timestamptz' })
    dateTo : Date;

    @CreateDateColumn()
    createdDate : Date;

    @Column()
    minAdults : Number;

    @Column()
    maxAdults : Number;

    @Column()
    property : string
}