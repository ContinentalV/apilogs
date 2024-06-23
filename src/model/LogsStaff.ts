import mongoose from "mongoose";
import { ILogsStaff} from '../types/type'


const LogsStaffSchema = new mongoose.Schema({
// LOGS STAFF

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
 actions: {
        message: {type: String, required: true},
 }



});
interface IStaffModel extends ILogsStaff, mongoose.Document {}
LogsStaffSchema.index({ category: 1 });
LogsStaffSchema.index({ timestamp: 1 });
LogsStaffSchema.index({ title: 1 });
LogsStaffSchema.index({ title: 'text', category: 'text', steamName: 'text', license: 'text', montant: 'text', actions: 'text'  });


export default mongoose.model<IStaffModel>("LogsStaff", LogsStaffSchema);



/*
###STAFF - ✅
===========================================================================================================================================
message                      steamname, date, action (message: blabla, reçu par: steamname)
heal                         steamname, date, action (healed: steamname)
rea staff                    steamname, date, action (a revive intel)
staff                        steamname, date, action (a pris ou a quitter son service)
wipe clear                   steamname, date, licence,  , action (wipe/clear)
jail                         steamname, date, licence, , action (mettre la raison + temps)
===========================================================================================================================================
 */

