import mongoose, { Schema, Document } from 'mongoose';

interface ILogSchema extends Document {
    name: string;
    fields: { [key: string]: string };
}

const LogSchema = new Schema({
    name: { type: String, required: true, unique: true },
    fields: { type: Map, of: String, required: true },
}, { timestamps: true });

const LogSchemaModel = mongoose.model<ILogSchema>('LogSchema', LogSchema);
export default LogSchemaModel;
