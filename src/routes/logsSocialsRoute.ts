import express from 'express';
import {
    createLogLogsSocials,
    getAllLogsLogsSocialsPaginate,
    getLogLogsSocialsCount, viewLogsSocialsController
} from "../controller/logsSocialstController";





const router = express.Router();

router.post('/create',createLogLogsSocials ); // Route POST pour créer un log
router.get('/count', getLogLogsSocialsCount); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsLogsSocialsPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewLogsSocialsController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
