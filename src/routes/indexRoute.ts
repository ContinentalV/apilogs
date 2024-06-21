import express from 'express';
import { viewIndexes, viewStats } from '../controller/indexController'; // Import des contrôleurs

const router = express.Router();

router.get('/indexes', viewIndexes); // Route GET pour voir les index
router.get('/stats', viewStats); // Route GET pour voir les stats

export default router;
