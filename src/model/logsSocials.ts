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
    // a voir si
    actions: {
       idPost: {type: Number, required: false},
      message: {type: String, required: true},
      telNumber: {type: String, required: false},
      time: {type: String, required: false},
      answeringCall: {type: String, required: false},
      sms: {type: String, required: false},
      instaPhotoUrl: {type: String, required: false},
     twitterContent: {type: String, required: false},
     twitterAttachment:{type: String, required: false},
     yellowPageContent: {   type: String, required: false},
     yellowPageAttachment: {   type: String, required: false},
     marketPlaceContent: {   type: String, required: false},
     marketPlaceAttachment: {   type: String, required: false},
     portefueilleContent: {   type: String, required: false},
     portefeuilleActions: {   type: String, required: false,},
     darkChatContent: {   type: String, required: false},
     servicesContent: {type: String, required: false},
     tikttokContent: {type: String, required: false},
     uploadsContent: {type: String, required: false},
     uploadsAttachment: {type: String, required: false},

    }

});

logsSocialsSchema.index({ category: 1 });
logsSocialsSchema.index({ timestamp: 1 });
logsSocialsSchema.index({ titre: 1 });
logsSocialsSchema.index({ title: 'text', category: 'text', steamName: 'text', discord: 'text', license: 'text', description: 'text', actions: 'text'  });
interface ILogsSocialsModel extends ILogsSocials, mongoose.Document {}
export default mongoose.model<ILogsSocialsModel>("LogsSocials", logsSocialsSchema);

//TODO


