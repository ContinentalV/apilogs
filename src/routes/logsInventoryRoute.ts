import express from 'express';
import {
 createLogInventory,
 getAllLogsInventoryPaginate,
 getLogInventory,
 viewInventoryController
} from "../controller/logsInventoryController";






const router = express.Router();

router.post('/create',createLogInventory); // Route POST pour créer un log
router.get('/count', getLogInventory); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsInventoryPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewInventoryController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
