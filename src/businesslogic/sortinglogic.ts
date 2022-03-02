import { ISortingProvider } from "../businessentities/ISortingProvider";
import PropertyResult from "../businessentities/PropertyResults";
import { FilterData } from "../types/FilterData";


export default class SortingProvider implements ISortingProvider
{
    async FilterPropertyResults(propertyResults: PropertyResult[], filterData : FilterData): Promise<PropertyResult[]> {
        //TODO : implement filter logic
        throw new Error("Method not implemented.");
    }
    async SortPropertyResults(propertyResults: PropertyResult[]): Promise<PropertyResult[]> 
    {
        //TODO : implement sorting algorithm
        return propertyResults;
    }

}