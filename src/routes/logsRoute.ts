import { Router } from 'express';
import { createLogSchema, createDynamicLog } from '../controller/LogsSchemaController';

const router = Router();

router.post('/create-log-schema', createLogSchema); // Route pour créer le schéma de logs
router.post('/log', createDynamicLog); // Route pour créer un log basé sur un schéma dynamique

export default router;
