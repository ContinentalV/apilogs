import express from 'express';
import {
 createLogEntreprise,
 getAllLogsEntreprisePaginate,
 getLogEntreprise, viewEntrepriseController
} from "../controller/logsEntrepriseController";




const router = express.Router();

router.post('/create',createLogEntreprise); // Route POST pour créer un log
router.get('/count', getLogEntreprise); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsEntreprisePaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewEntrepriseController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
