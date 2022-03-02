import { FilterData } from "../types/FilterData";
import PropertyResult from "./PropertyResults";

export interface ISortingProvider {
    SortPropertyResults(propertyResults : PropertyResult[]): Promise <PropertyResult[]>;
    FilterPropertyResults(propertyResults : PropertyResult[], filterData : FilterData): Promise <PropertyResult[]>;
}