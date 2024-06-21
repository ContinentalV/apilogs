import { Request, Response, NextFunction } from 'express';
import { getIndexes, getStats } from '../services/indexService';

export const viewIndexes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const indexes = await getIndexes();
        res.status(200).json(indexes);
    } catch (error) {
        next(error);
    }
}

export const viewStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await getStats();
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
}
