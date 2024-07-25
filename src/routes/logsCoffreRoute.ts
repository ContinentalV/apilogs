import express from 'express';
import {
 createLogCoffre,
 getAllLogsCoffrePaginate,
 getLogCoffre,
 viewCoffreController
} from "../controller/logsCoffreController";





const router = express.Router();

router.post('/create',createLogCoffre); // Route POST pour créer un log
router.get('/count', getLogCoffre); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsCoffrePaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewCoffreController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
