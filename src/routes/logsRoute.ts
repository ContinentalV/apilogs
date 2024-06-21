import express from 'express';
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';
import LogsModelBan from "../model/logsBan";

const router = express.Router();

router.post('/create', createLogGeneric(LogsModelBan)); // Route POST pour créer un log
router.get('/count', getLogCountGeneric(LogsModelBan)); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsPaginateGeneric(LogsModelBan)); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewGeneric(LogsModelBan)); // Route GET pour voir tous les logs

export default router;