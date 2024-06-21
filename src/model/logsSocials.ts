import mongoose from "mongoose";
import { ILogsSocials} from '../types/type'

const logsSocialsSchema = new mongoose.Schema({
//depot/retrait banque + les 2 logs casino
    timestamp: {
        type: Number,
        required: true
    },
    // categorie General
    category: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    licence: {
        type: String,
        required: true
    },
    nomSteam: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    discord: {
        type: String,
        required: true
    },
    actions: {
        type: String,
        required: true
    }







});

logsSocialsSchema.index({ category: 1 });
logsSocialsSchema.index({ timestamp: 1 });
logsSocialsSchema.index({ titre: 1 });
logsSocialsSchema.index({ title: 'text', category: 'text', steamName: 'text', discord: 'text', license: 'text', description: 'text', actions: 'text'  });
interface ILogsSocialsModel extends ILogsSocials, mongoose.Document {}
export default mongoose.model<ILogsSocialsModel>("LogsSocials", logsSocialsSchema);

//TODO


