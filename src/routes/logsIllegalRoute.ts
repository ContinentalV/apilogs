import express from 'express';

import {
 createLogIllegal,
 getAllLogsIllegalPaginate,
 getLogIllegal,
 viewIllegalController
} from "../controller/logsIllegalController";




const router = express.Router();

router.post('/create',createLogIllegal); // Route POST pour créer un log
router.get('/count', getLogIllegal); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsIllegalPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewIllegalController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
