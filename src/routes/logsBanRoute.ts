import express from 'express';
 import {createLogBan, viewBanController, getLogBanCount, getAllLogsBanPaginate } from '../controller/logsBanController';



const router = express.Router();

router.post('/create',createLogBan); // Route POST pour créer un log
router.get('/count', getLogBanCount); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsBanPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewBanController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
