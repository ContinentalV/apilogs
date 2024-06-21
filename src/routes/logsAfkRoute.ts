import express from 'express';
import {createLogAfk, getAllLogsAfkPaginate, getLogAfkCount, viewAfkController} from "../controller/logsAfkController";
 ;





const router = express.Router();

router.post('/create', createLogAfk ); // Route POST pour créer un log
router.get('/count', getLogAfkCount); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsAfkPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewAfkController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
