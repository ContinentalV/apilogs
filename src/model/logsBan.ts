import mongoose from "mongoose";
import { IBan} from '../types/type'

const typeBan = ["ingame", "license"];
const logsBanSchema = new mongoose.Schema({
//Logs BAN

category: {
    type: String,
    required: true
},
title: {
    type: String,
    required: true
},
typeOfBan: {
    type: String,
    required: true,
    enum: typeBan
},

license: {
    type: String,
    required: true
},
idIngame: {
    type: Number,
    required: false
},

steamName:{
    type: String,
    required: false
},
timestamp: {
    type: Number,
    required: true
},
    raison: {
        type: String,
        required: true
    },
    expiration: {
        type: String,
        required: true
    },
    banId: {
        type: String,
        required: true
    },

    discordId: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },






});
interface IBanModel extends IBan, mongoose.Document {}
logsBanSchema.index({ category: 1 });
logsBanSchema.index({ timestamp: 1 });
logsBanSchema.index({ title: 1 });
logsBanSchema.index({ title: 'text', category: 'text', steamName: 'text', discordId: 'text', author: 'text', license: 'text', raison: 'text', expiration: 'text', banId: 'text'});

export default mongoose.model<IBanModel>("LogsBan", logsBanSchema);

