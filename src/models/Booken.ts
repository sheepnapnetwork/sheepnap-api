import { Schema, model } from 'mongoose';

const bookenSchema = new Schema(
{
    stay : { type: Schema.Types.ObjectId, ref: 'Property' },
    code : { type : String, required : true },
    dateFrom : { type : Date },
    dateTo : { type : Date },
    minAdults : { type : Number },
    maxAdults : { type : Number },
    
});

export default model('Booken', bookenSchema);