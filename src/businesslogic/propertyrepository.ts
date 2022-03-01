import { Property } from "../entity/Property";
import { PropertyMetadata } from "../types/PropertyMetadataType";
import {getConnection, getRepository, SelectQueryBuilder} from 'typeorm';
import { PropertyImage } from "../entity/PropertyImage";
import { Amenity } from "../entity/Amenities";

export default class PropertyRepository
{
    async AddPropertyMetadata(propertyMetadata : PropertyMetadata, 
        address : string
        , owner : string
        , metadataendpoint : string)
    {
        await getConnection().transaction(async transactionalEntityManager => {

            let date: Date = new Date();
            let property = new Property();
            property.address = address;
            property.name = propertyMetadata.name;
            property.description = propertyMetadata.description;
            property.owner = owner;
            property.createdDate = date;
            property.active = true;
            property.approved = false;
            property.reviews = 0;
            property.metadatareference = metadataendpoint;
            
            await transactionalEntityManager.save(property);

            propertyMetadata.images.forEach(async (image) => 
            {
                let propertyImage: PropertyImage = new PropertyImage();
                propertyImage.priority = image.priority;
                propertyImage.property = property;
                propertyImage.url = image.url;
                propertyImage.title = image.title;
                await transactionalEntityManager.save(propertyImage);
            });

            propertyMetadata.amenities.forEach(async (amenitie)=>{

                let amenitieTosave : Amenity = new Amenity();
                amenitieTosave.code = amenitie.code;
                amenitieTosave.name = amenitie.name;
                amenitieTosave.property = property;
                await transactionalEntityManager.save(amenitieTosave);
            });
        });
    }
}