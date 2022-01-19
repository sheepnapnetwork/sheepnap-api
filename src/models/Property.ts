import { Schema, model } from 'mongoose';

const PropertySchema = new Schema({

    name : { type : String, required : true },
    description : { type : String, required : true },
    createdAt : { type : Date, default : Date.now },
    updateAt : Date
});

export default model('Property', PropertySchema);
