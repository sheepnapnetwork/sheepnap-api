import { PropertyMetadata } from "../types/PropertyMetadataType";

export interface IMetadataValidator {
    validateMetadata(metadataendpoint : string): Promise<PropertyMetadata>;
}
