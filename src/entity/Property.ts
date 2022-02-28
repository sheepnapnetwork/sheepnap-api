import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { PropertyImage } from "./PropertyImage";
import { RoomType } from "./RoomType";

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

    @Column()
    active : boolean

    @Column()
    approved : boolean

    @Column({ default : 0})
    reviews : Number = 0

    @Column()
    metadatareference : string

    @Column({default: 0})
    trustlevel : Number = 0

    @Column({default: 0})
    badgescount : Number = 0

    @Column({default: 0})
    rating : Number = 0

    @OneToMany(() => PropertyImage, propertyImage => propertyImage.property)
    Images : PropertyImage[]

    @OneToMany(() => RoomType, roomType => roomType.property)
    RoomType : RoomType[]
}