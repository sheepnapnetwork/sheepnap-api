import {ViewEntity, ViewColumn, Connection} from "typeorm";
import { Property } from "./Property";

@ViewEntity({
    //name : "view_properties_by_month",
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("count(EXTRACT(DAY FROM p.createdDate))",  "countproperty") 
        .addSelect("EXTRACT(MONTH FROM p.createdDate)",  "month")
        .from(Property, "p")
        .addGroupBy("EXTRACT(year FROM p.createdDate), EXTRACT(MONTH FROM p.createdDate) " )
       
})
export class ViewPropertiesByMonth {

    // @ViewColumn()
    // id: number;

    @ViewColumn()
    countproperty: number;

    @ViewColumn()
    month: number;

}