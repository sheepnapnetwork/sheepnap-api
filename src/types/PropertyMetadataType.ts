

export type PropertyMetadata = {
    name: string,
    description : string,
    website : string,
    facebook : string,
    instagram : string,
    address : string,
    latitude : string,
    longitude : string,
    category : PropertyCategory,
    images : Array<Image>,
    amenities : Array<Amenity>
};

type Image =
{
    url : string,
    title : string,
    priority : Number
}

type Amenity =
{
    name : string,
    code : number,
}

export type PropertyCategory = "Cabin" | "Apartment";