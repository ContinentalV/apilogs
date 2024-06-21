// src/functions/controllerUtility.ts
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import {createDataDb, createQuery, countDocuments, findWithPagination, viewAll, validateDataTypes} from './utility';
import LogsAfk from "../model/LogsAfk";

export const createLogGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {


        req.body.timestamp = Date.now()
        validateDataTypes(req.body, model);
        await createDataDb(model, req.body)
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
        const { search,
            title,
            startTime,
            endTime,
            page = 1,
            limit = 10,
            startDate,
            endDate,
            montant} = req.query;


        //console.log(req.query)
        //@ts-ignore
        const query = createQuery(search, title, startDate, endDate, startTime, endTime,  montant);
        console.log(query)
        const logs = await findWithPagination(model, query, Number(page), Number(limit));
        const totals = await countDocuments(model, query);
        const distinctTitles = await model.distinct('title');
        res.status(200).json({data: logs, totals: totals, titles: distinctTitles});
    } catch (error) {
        next(error);
    }
}

export const viewGeneric = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await viewAll(model)
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}


