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

    @Column()
    reviews : Number

    @Column()
    MetadataReference : string

    @OneToMany(() => PropertyImage, propertyImage => propertyImage.property)
    Images : PropertyImage[]

    @OneToMany(() => RoomType, roomType => roomType.property)
    RoomType : RoomType[]
}