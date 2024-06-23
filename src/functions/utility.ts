import { Model , Document} from 'mongoose';
//TODO MODIFIER TIMESTAMP ET AJOUT PROPRIETE DATEACTION
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const createQuery = (
                            search?: any
                             , title?:string,
                            startDate?:string ,
                            endDate?: string ,
                            startTime?: string ,
                            endTime?: string ,
                            montant?: number,
                              )  => {
    let query: any = {}

    if (title) {
        const titles = title.split('.');
        query.title = { $in: titles };
    }
if (startDate || endDate || startTime || endTime) {
    query.timestamp = generateTimeFilter(startDate, endDate, startTime, endTime);
}

if(montant){
query.montant = genrateFilterMontant(montant)
    }




    if (search) {
        query = {
            ...query,
            $or: [
                {title: {$regex: search, $options: 'i'}},
                {category: {$regex: search, $options: 'i'}},
                {steamName: {$regex: search, $options: 'i'}},
                {license: {$regex: search, $options: 'i'}},
                {typeOfBan: {$regex: search, $options: 'i'}},
                {idIngame: {$regex: search, $options: 'i'}},
                {raison: {$regex: search, $options: 'i'}},
                {discordId: {$regex: search, $options: 'i'}},
                {banId: {$regex: search, $options: 'i'}},
                {expiration: {$regex: search, $options: 'i'}},
                {author: {$regex: search, $options: 'i'}},
                {actions: {$regex: search, $options: 'i'}},
                {"actions.message": {$regex: search, $options: 'i'}},
                {"actions.item": {$regex: search, $options: 'i'}},
                {"actions.licenceEmployer": {$regex: search, $options: 'i'}},
                {"actions.receiverPlayer": {$regex: search, $options: 'i'}},
            ]
        }
    }

    return query;
}
export const countDocuments = async (model: Model<any>, query: any) => {
    try {
        return await model.countDocuments(query);
    } catch (error) {
        throw error;
    }
}
export const findWithPagination = async (model: Model<any>, query: any, page: number = 1, limit: number = 10) => {
    try {
        return await model.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ timestamp: -1 });
    } catch (error) {
        throw error;
    }
}
export const viewAll = ( model: Model<any>) => {
    try {
        return model.find();
    } catch (error) {
        throw error;
    }
}
export const createDataDb = async (model: any, data: any) => {
    try {
        const newData = new model(data);
        await newData.save();
    } catch (error: any) {
      throw error
    }
}



export const validateDataTypes = (data: any, model: Model<Document>) => {
  const schema = model.schema;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const pathSchema = schema.path(key);
      if (pathSchema) {
        const expectedType = pathSchema.instance;
        const actualType = (data[key] instanceof Date) ? 'Date' : typeof data[key];
        if (data[key] === null && pathSchema.options.required !== true) {
          continue;
        }
        if (expectedType.toLowerCase() !== actualType.toLowerCase()) {
          throw new Error(`Invalid type for field ${key}. Expected ${expectedType}, got ${actualType}`);
        }
      }
    }
  }
}
/*
export const buildTimestampFilter = (startDate: string | undefined, endDate: string | undefined, startTime: string | undefined, endTime: string | undefined) => {
    return generateTimeFilter(startDate, endDate, startTime, endTime);
};

 */
export const generateTimeFilter = (startDate?: string, endDate?: string, startTime?: string, endTime?: string) => {
    let filter: any = {};
    console.log(startTime, endTime)
    if (startDate && endDate) {
        if (startDate === endDate) {
            let startDateTime = dayjs.tz(startDate).startOf('day');
            let endDateTime = dayjs.tz(startDate).endOf('day');
            filter = { $gte: startDateTime.valueOf(), $lte: endDateTime.valueOf() };
        } else {
            let startDateTime = dayjs.tz(startDate).startOf('day');
            let endDateTime = dayjs.tz(endDate).endOf('day');
            filter = { $gte: startDateTime.valueOf(), $lte: endDateTime.valueOf() };
        }
    } else if (startTime && endTime) {
        let startDateTime = dayjs.tz(`${dayjs().format('YYYY-MM-DD')} ${startTime}`);
        let endDateTime = dayjs.tz(`${dayjs().format('YYYY-MM-DD')} ${endTime}`);
        filter = { $gte: startDateTime.valueOf(), $lte: endDateTime.valueOf() };
    } else if(startDate && !endDate){
        filter = { $gte: dayjs.tz(startDate).startOf('day').valueOf() };
    } else if (!startDate && endDate) {
        filter = { $lte: dayjs.tz(endDate).endOf('day').valueOf() };
    } else if (startTime && !endTime) {
        filter = { $gte: dayjs.tz(`${dayjs().format('YYYY-MM-DD')} ${startTime}`).valueOf() };
    } else if (!startTime && endTime) {
        filter = { $lte: dayjs.tz(`${dayjs().format('YYYY-MM-DD')} ${endTime}`).valueOf() };
    }
    return filter;
};

export const genrateFilterMontant = (montant:number ) => {
    let filter: any = {};
    const sup=montant.toString().includes('>');
    const inf=montant.toString().includes('<');
    const between=montant.toString().includes('-');
    const infEqual=montant.toString().includes('<=');
    const supEqual=montant.toString().includes('>=');



    if(between){
        const montantFinal = montant.toString().split('-');
        console.log(montantFinal[0], montantFinal[1])
        filter = { $gte: Number(montantFinal[0]), $lte: Number(montantFinal[1]) };
    }

    if(inf){
        const montantFinal =Number( montant.toString().replace('<', ''));
        filter = { $lt: montantFinal };
    }
    if(sup){
        const montantFinal =Number( montant.toString().replace('>', ''));
        filter = { $gt: montantFinal };
    }
    if(infEqual) {
        const montantFinal = Number(montant.toString().replace('<=', ''));
        filter = {$lte: montantFinal};
    }
    if(supEqual) {
        const montantFinal = Number(montant.toString().replace('>=', ''));
        filter = {$gte: montantFinal};
    }

    return filter;

}