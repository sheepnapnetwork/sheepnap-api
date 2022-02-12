export type PropertyMetadata = {
    name: string,
    description : string,
    website : string,
    facebook : string,
    instagram : string,
    address : string,
    latitude : string,
    longitude : string,
    images : Array<Image>
};

type Image =
{
    url : string,
    title : string,
    priority : Number
}