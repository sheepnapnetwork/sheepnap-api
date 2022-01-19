import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({

    name : { type : String, required : true },
    geo : { type : Object, required : true  }
});

export default model('Location', LocationSchema);
