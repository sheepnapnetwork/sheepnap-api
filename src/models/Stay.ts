import { Schema, model } from 'mongoose';

const StaySchema = new Schema(
{
    name : { type : String, required : true },
    address : { type : String, required : true },
    description : { type : String, required : true },
    ipfs : { type : String, required : true },
    images : [String],
    createdAt : { type : Date, default : Date.now },
    updateAt : Date
});

export default model('Stay', StaySchema);
