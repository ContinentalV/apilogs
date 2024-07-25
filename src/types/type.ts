// types.ts
export interface IAfk {
  timestamp: Date;
  category: string;
  title: string;
  steamName: string;
  license: string;
  item: string;
  prix: number;
  plaque?: string | null;
}

export interface IBan {
  category: string;
  title: string;
  typeOfBan: string;
  license: string;
  idIngame?: string;
  steamName?: string;
  timestamp: Date;
  raison: string;
  expiration: string;
  banId: string;
  discordId?: string;
  author: string;
}

export interface IArgent {
  timestamp: Date;
  category: string;
  title: string;
  license: string;
  steamName: string;
  montant: number;
  jeton?: number;
}

export interface ILogsSocials {

  timestamp: Date;
  category: string;
  titre: string;
  licence: string;
  nomSteam: string;
  description: string;
  discord: string;
    actions: {
        idPost?: number;
        message: string;
        telNumber?: string;
        time?: string;
        answeringCall?: string;
        sms?: string;
        instaPhotoUrl?: string;
        twitterContent?: string;
        twitterAttachment?: string;
        yellowPageContent?: string;
        yellowPageAttachment?: string;
        marketPlaceContent?: string;
        marketPlaceAttachment?: string;
        portefueilleContent?: string;
        portefeuilleActions?: string;
        darkChatContent?: string;
        servicesContent?: string;
        tikttokContent?: string;
        uploadsContent?: string;
        uploadsAttachment?: string;
    }

}

export interface ILogsEntreprise {
    timestamp: Number;
    category: string;
    title: string;
    steamName: string;
    license: string;
    montant: number;
    actions: {
        message: string;
        licenceEmployer: string;
    }

}

export interface ILogsIllegal {
timestamp: Number;
    category: string;
    title: string;
    steamName: string;
    license: string;
    montant: number;
    actions: {
        message: string;
        item: string;
    }
}

export interface ILogsInventory {

    timestamp: Number;
    category: string;
    title: string;
    steamName: string;
    license: string;
    idIngame: number;
    item: string;
    quantity: number;
    actions: {
        message: string;
        receiverPlayer: string;
    }
}


export interface ILogsStaff {
    timestamp: Number;
    category: string;
    title: string;
    steamName: string;
    license: string;

}

export interface iLogsCoffre{

    timestamp: Number;
    category: string;
    title: string;
    steamName: string;
    license: string;
    idIngame: number;
    item: string;
    quantity: number;
    actions: {
        message: string;
        namePlayer?: string;
        plaque?:string;
    }

}