import mongoose, { Schema, Model } from 'mongoose';
import LogSchemaModel from '../model/LogsSchemaModel';

const modelCache: { [key: string]: Model<any> } = {};

const validTypes: { [key: string]: any } = {
    String: mongoose.Schema.Types.String,
    Number: mongoose.Schema.Types.Number,
    Boolean: mongoose.Schema.Types.Boolean,
    Date: mongoose.Schema.Types.Date,
    Buffer: mongoose.Schema.Types.Buffer,
    ObjectId: mongoose.Schema.Types.ObjectId,
    Array: mongoose.Schema.Types.Array,
    Map: mongoose.Schema.Types.Map,
    Mixed: mongoose.Schema.Types.Mixed,
    Object: mongoose.Schema.Types.Mixed
};

const createSchemaDefinition = (fields: any): { [key: string]: any } => {
    const schemaDef: { [key: string]: any } = {};
    for (const key in fields) {
        if (!fields.hasOwnProperty(key) || key.startsWith('__') || key.startsWith('$')) {
            continue; // Ignorer les champs spéciaux et indésirables
        }
        const field = fields[key];
        console.log(`Processing field: ${key}, type: ${field.type}`);
        if (field.type === 'Object' && field.properties) {
            schemaDef[key] = new Schema(createSchemaDefinition(field.properties), { _id: false });
        } else {
            const fieldType = field.type;
            console.log(`Field type for ${key}: ${fieldType}`);
            if (validTypes[fieldType]) {
                schemaDef[key] = { type: validTypes[fieldType] };
            } else {
                throw new Error(`Invalid schema type: ${fieldType}`);
            }
        }
    }
    return schemaDef;
};

export const generateDynamicModel = async (schemaName: string): Promise<Model<any>> => {
    if (modelCache[schemaName]) {
        return modelCache[schemaName];
    }

    // Check if the model already exists in mongoose models
    if (mongoose.models[schemaName]) {
        modelCache[schemaName] = mongoose.models[schemaName];
        return modelCache[schemaName];
    }

    const logSchemaDoc = await LogSchemaModel.findOne({ name: schemaName });
    if (!logSchemaDoc) throw new Error('Log schema not found');

    console.log(`Generating schema for: ${schemaName}`);
    console.log(logSchemaDoc.fields);

    const dynamicSchemaDef = createSchemaDefinition(logSchemaDoc.fields);

    const dynamicSchema = new Schema(dynamicSchemaDef, { timestamps: true });

    if (logSchemaDoc.indexes) {
        logSchemaDoc.indexes.forEach(index => {
            dynamicSchema.index(index.fields as mongoose.IndexDefinition, index.options);
        });
    }

    const DynamicModel = mongoose.model(schemaName, dynamicSchema);
    modelCache[schemaName] = DynamicModel;
    return DynamicModel;
};

export const saveLog = async (schemaName: string, logData: any) => {
    const LogModel = await generateDynamicModel(schemaName);
    const logEntry = new LogModel(logData);
    await logEntry.save();
};
