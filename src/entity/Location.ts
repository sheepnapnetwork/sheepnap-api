import { Entity, PrimaryColumn, Column } from "typeorm";
import { Geometry } from "geojson";

@Entity()
export class Location
{
    @PrimaryColumn()
    address : number;

    @Column()
    dataPoint: string;
}