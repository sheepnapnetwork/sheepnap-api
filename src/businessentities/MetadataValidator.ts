import axios, {AxiosResponse, AxiosResponseHeaders} from "axios";
import {PropertyMetadata} from '../types/PropertyMetadataType';
import { IMetadataValidator } from "./IMetadataValidator";


export default class MetadataValidator implements IMetadataValidator {
    async validateMetadata(metadataendpoint : string): Promise <PropertyMetadata> {

        let propertyJSON: AxiosResponse = await axios.get(metadataendpoint);
        var propertyMetadata = <PropertyMetadata>propertyJSON.data;

        if (!propertyMetadata.amenities) {
            throw new Error("Metadata must contain amenities");
        }

        if (!propertyMetadata.images) {
            throw new Error("Metadata must contain images");
        }

        return propertyMetadata;
    }

}
