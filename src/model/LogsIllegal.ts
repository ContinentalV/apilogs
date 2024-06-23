import mongoose from "mongoose";
import { ILogsIllegal} from '../types/type'


const LogsIllegalSchema = new mongoose.Schema({
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
        item: {type: String, required: false},
    }


});
interface IillegalModel extends ILogsIllegal, mongoose.Document {}
LogsIllegalSchema.index({ category: 1 });
LogsIllegalSchema.index({ timestamp: 1 });
LogsIllegalSchema.index({ title: 1 });
LogsIllegalSchema.index({ title: 'text', category: 'text', steamName: 'text', license: 'text', montant: 'text', actions: 'text'  });


export default mongoose.model<IillegalModel>("LogsIllegal", LogsIllegalSchema);

/*
###Illegal - 1  ✅
===========================================================================================================================================

pacific banque :             steamname, date, license montant, message?
commission territoire:       steamname, date, license, montant, message?
chasseur de prime:           steamname, date, license, montant, message?
Gofast:                      steamname, date, license, montant, message?
cambriolage:                 steamname, date, licence, montant, message?
bobcat-braco                 steamName, date, licence, montant, message?
braco-bijouterie:            steamname, date, license,          message?
craft arme:                  steamname, date, license, montant, message?(mettre item dans message)

===========================================================================================================================================
 */



