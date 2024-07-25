import mongoose from "mongoose";
import {iLogsCoffre} from '../types/type'


const LogsCoffreSchema = new mongoose.Schema({
// LOGS ICOFFRE
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
   timestamp: {
        type: Number,
       required: true
   },
   steamName:{
    type: String,
    required: false
   },
    license: {
     type: String,
     required: true
    },
    idIngame: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    actions:{
        message: {type: String, required: true},
        receiverPlayer: {type: String, required: false},
        plaque: {type: String, required: false}
    }



});
interface ICoffreModel extends iLogsCoffre, mongoose.Document {}
LogsCoffreSchema.index({ category: 1 });
LogsCoffreSchema.index({ timestamp: 1 });
LogsCoffreSchema.index({ title: 1 });
LogsCoffreSchema.index({ title: 'text', category: 'text', steamName: 'text', license: 'text', idIngame: 'text', item: 'text', quantity: 'text', actions: 'text'  });


export default mongoose.model<ICoffreModel>("LogsCoffre", LogsCoffreSchema);



/*



###Coffre
===========================================================================================================================================
fouille                      steamname, date, licence a ajouté, IDIG,  item, nombre, action (vient de récupérer à: steamname)
coffre propriete             steamname, date, licence a ajouté, IDIG,  item, nombre, action (vient de recevoir un item dans une propriété)
coffre societe               steamname, date, licence a ajouté, IDIG,  item, nombre, action (vient de recevoir un item dans une société nomsociete)
coffre vehicule              steamname, date, licence a ajouté, IDIG,  item, nombre, action (vient de déposer un item dans un véhicule (plaque))
===========================================================================================================================================

 */