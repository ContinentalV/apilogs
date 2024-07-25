import express from 'express';
import { createDynamicLog } from '../controller/LogsSchemaController';

const router = express.Router();

router.post('/logs', createDynamicLog); // Route POST pour créer un log dynamique

export default router;
