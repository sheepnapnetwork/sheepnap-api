import { Column, Entity, PrimaryColumn } from "typeorm"


@Entity()
export class Badge {

    @PrimaryColumn()
    code : Number;

    @Column()
    name : string;

    @Column()
    description : string;


    @Column()
    owner : string;

    @Column()
    quantity : Number;

    @Column()
    src : string;

}