import express from 'express';
import {
 createLogStaff,
 getAllLogsStaffPaginate,
 getLogStaff,
 viewStaffController
} from "../controller/logsStaffController.ts";






const router = express.Router();

router.post('/create',createLogStaff); // Route POST pour créer un log
router.get('/count', getLogStaff); // Route GET pour obtenir le nombre de logs
router.get('/viewAllLogs', getAllLogsStaffPaginate); // Route GET pour voir tous les logs avec pagination et filtrage
router.get('/view', viewStaffController); // Route GET pour voir tous les logs avec pagination et filtrage

export default router;
