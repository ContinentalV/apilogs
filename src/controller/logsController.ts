import { Request, Response, NextFunction } from 'express';
import { createLogs, getAllCount, viewAllLogsPaginate, view } from '../services/logsService';

export const createLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, category } = req.body;
        await createLogs(message, category);
        res.status(201).json("Logs created");
    } catch (error) {
        next(error);
    }
}

export const getLogCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await getAllCount();
        res.status(200).json({ count });
    } catch (error) {
        next(error);
    }
}

export const getAllLogsPaginate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        const logs = await viewAllLogsPaginate(category as string, Number(page), Number(limit));
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}

export const viewController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logs = await view()

        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}