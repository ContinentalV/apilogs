import express from 'express';
import {
    createLogArgent,
    getAllLogsArgentPaginate,
    getLogArgentCount,
    viewArgentController
} from "../controller/logsArgentController";




const router = express.Router();

router.post('/create', createLogArgent ); // Route POST pour créer un log
router.get('/count', getLogArgentCount); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsArgentPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewArgentController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
