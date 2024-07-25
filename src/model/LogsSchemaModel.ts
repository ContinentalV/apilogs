import mongoose, { Schema, Document } from 'mongoose';

interface ILogSchema extends Document {
    name: string;
    fields: { [key: string]: any };
    indexes: { fields: { [key: string]: number }, options?: object }[];
}

const FieldSchema = new Schema({
    type: { type: String, required: true },
    properties: { type: Map, of: new Schema({ type: { type: String, required: true } }, { _id: false }) }
}, { _id: false });

const LogSchema = new Schema({
    name: { type: String, required: true, unique: true },
    fields: { type: Map, of: FieldSchema, required: true },
    indexes: { type: [Object], default: [] },
}, { timestamps: true });

const LogSchemaModel = mongoose.model<ILogSchema>('LogSchema', LogSchema);
export default LogSchemaModel;
