import mongoose from "mongoose";
import { IArgent} from '../types/type'
const logsArgentSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    steamName: {
        type: String,
        required: true
    },
    montant: { // Argent ou Montant
    type: Number,
    required: true
},
jeton: {
    type: Number,
    required: false
},

});
export interface IArgentModel extends IArgent, mongoose.Document {}
logsArgentSchema.index({ category: 1 });
logsArgentSchema.index({ timestamp: 1 });
logsArgentSchema.index({ title: 1 });
logsArgentSchema.index({ montant: 1 });
logsArgentSchema.index({ title: 'text', category: 'text', steamName: 'text', license: 'text' });



export default mongoose.model<IArgentModel>("LogsArgent", logsArgentSchema);

// ECRIRE UNE FONCTION QUI VA RECUPERER LES DONNEES DE LA BDD ET LES METTRE DANS UN FICHIER CSV
