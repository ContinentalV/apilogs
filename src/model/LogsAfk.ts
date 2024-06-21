import mongoose from "mongoose";
import { IAfk } from '../types/type'
const logsAfkSchema = new mongoose.Schema({
//TODO Logs AFK

    timestamp: {
        type: Date,
        required: true
    },
    // categorie General
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    steamName: {
        type: String,
        required: true

    },

    license: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    prix : {
        type: Number,
        required: true
    },
     plaque: {
        type: String,
        required: false
     }




});
interface IAfkModel extends IAfk, mongoose.Document {}
logsAfkSchema.index({ category: 1 });
logsAfkSchema.index({ timestamp: 1 });
logsAfkSchema.index({ titre: 1 });
logsAfkSchema.index({ title: 'text', category: 'text', steamName: 'text', plaque: 'text', license: 'text'});

export default mongoose.model<IAfkModel>("LogsAfk", logsAfkSchema);



