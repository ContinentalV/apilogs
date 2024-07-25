import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { createDataDb, createQuery, countDocuments, findWithPagination, viewAll, validateDataTypes } from './utility';
import { generateDynamicModel, saveLog } from '../services/logsService';

export const createLogGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.timestamp = Date.now();
        validateDataTypes(req.body, model);
        await createDataDb(model, req.body);
        res.status(201).json("Logs created");
    } catch (error) {
        next(error);
    }
}

export const getLogCountGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, title } = req.query;
        //@ts-ignore
        const query = createQuery(search, title);
        const count = await countDocuments(model, query);
        res.status(200).json({ count });
    } catch (error) {
        next(error);
    }
}

export const getAllLogsPaginateGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, title, startTime, endTime, page = 1, limit = 10, startDate, endDate, montant } = req.query;
        //@ts-ignore
        const query = createQuery(search, title, startDate, endDate, startTime, endTime, montant);
        const logs = await findWithPagination(model, query, Number(page), Number(limit));
        const totals = await countDocuments(model, query);
        const distinctTitles = await model.distinct('title');
        res.status(200).json({ data: logs, totals: totals, titles: distinctTitles });
    } catch (error) {
        next(error);
    }
}

export const viewGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await viewAll(model);
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}

export const createLogSchemaGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, fields, indexes } = req.body;

        if (!name || !fields) {
            return res.status(400).json({ error: 'Name and fields are required' });
        }

        console.log(`Creating log schema with name: ${name}`);
        console.log(`Fields: ${JSON.stringify(fields)}`);
        console.log(`Indexes: ${JSON.stringify(indexes)}`);

        const newLogSchema = new model({ name, fields, indexes });
        await newLogSchema.save();
        res.status(201).json("Nouveau schéma de logs créé: " + name);
    } catch (error) {
        next(error);
    }
};

export const createDynamicLogGeneric = (schemaModel: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schemaName, logData } = req.body;

        if (!schemaName || !logData) {
            return res.status(400).json({ error: 'Schema name and log data are required' });
        }

        await saveLog(schemaName, logData);
        res.status(201).json({ message: 'Log saved successfully' });
    } catch (error) {
        next(error);
    }
};
