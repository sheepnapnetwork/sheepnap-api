import { Schema, model } from 'mongoose';

const bookenSchema = new Schema(
{
    user: {type: Schema.Types.ObjectId, ref: 'Property' },
    code : { type : String, required : true },
    dateFrom : { type : Date },
    dateTo : { type : Date }
});

export default model('Booken', bookenSchema);