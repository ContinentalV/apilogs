import mongoose from "mongoose";
import { ILogsEntreprise} from '../types/type'


const LogsEntrepriseSchema = new mongoose.Schema({
// LOGS ENTREPRISE

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
    montant: {
        type: Number,
        required: true
    },
    actions:{
        message: {type: String, required: true},
        licenceEmployer: {type: String, required: true},
    }

});
interface IEntrepriseModel extends ILogsEntreprise, mongoose.Document {}


export default mongoose.model<IEntrepriseModel>("LogsEntreprise", LogsEntrepriseSchema);



/*
###ENTREPRISE
============================================================================================================================================
fourriere                  Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
taxi                       Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
hayes                      Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
bennys                     Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
burgershot                 Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
pizza                      Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
police                     Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
sherrif                    Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
pdm                        Steamame,  date, licence(receveur facture ), montant, action(facture envoyer par: licence employer)
===========================================================================================================================================
 */

