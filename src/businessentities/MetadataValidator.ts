import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import {PropertyMetadata} from '../types/PropertyMetadataType'; 

interface IMetadataValidator
{
    validateMetadata(metadataendpoint : string): Promise<PropertyMetadata>; 
}

export default class MetadataValidator implements IMetadataValidator
{
    async validateMetadata(metadataendpoint: string): Promise<PropertyMetadata> {
        try {
            console.log(metadataendpoint);
            let propertyJSON: AxiosResponse = await axios.get(metadataendpoint);
            var propertyMetadata = <PropertyMetadata>propertyJSON.data;
            return propertyMetadata;
        } catch (error) 
        {
            console.error(error);
            return null;
        }
    }
    
}