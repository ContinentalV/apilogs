import mongoose from "mongoose";
import {ILogsInventory} from '../types/type'


const LogsInventorySchema = new mongoose.Schema({
// LOGS INVENTORY

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
    idIngame:{
        type: Number,
        required: true
    },
    item:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    actions:{
        message: {type: String, required: true},
        receiverPlayer: {type: String, required: false},
    }



});
interface IInventoryModel extends ILogsInventory, mongoose.Document {}
LogsInventorySchema.index({ category: 1 });
LogsInventorySchema.index({ timestamp: 1 });
LogsInventorySchema.index({ title: 1 });
LogsInventorySchema.index({ title: 'text', category: 'text', steamName: 'text', license: 'text', idIngame: 'text', item: 'text', quantity: 'text', actions: 'text'  });


export default mongoose.model<IInventoryModel>("LogsInventory", LogsInventorySchema);



/*

###INVENTORY ✅
=============================================================================================================================
drop                         Steamname, date, licence( a ajouter),Idig, item, nombre, action(poser un item)
drop recuperer               Steamname, date, licence( a ajouter),Idig, item, nombre, action(recuperer un item)
item remove                  Steamname, date, licence( a ajouter),Idig, item, nombre, action(remove un item)
item add                     Steamname, date, licence( a ajouter),Idig, item, nombre, action(recevoir un item)
argent donner                Steamname, date, licence( a ajouter),Idig, item, nombre, action(donner/ poser argent)
recevoir argent              Steamname, date, licence( a ajouter),Idig, item, nombre, action( recevoir/recup argent)
give joueur a joueur         Steamname, date, licence( a ajouter),Idig, item, nombre, action( vient de donner a + nom a qui on a donner)
=============================================================================================================================
 */
