import  { Request, Response } from 'express';
import dotenv from 'dotenv';

import app from './app';

import dbConnect from "./config/database";


dotenv.config();

const port = process.env.PORT || 3000;
const isProduction = process.env.CUSTOM_ENV === 'production';

app.get('/', (req: Request, res: Response) => {
    res.send('Bonjour, Maître Getsu le Grand!');
});

dbConnect().then(() => {
    app.listen(Number(port), '0.0.0.0', () => {
        console.log(`▪️Serveur en cours d'exécution sur http://${isProduction ? '0.0.0.0' : 'localhost'}:${port}`);
        console.log('▪️Base de données connectée avec succès✅✅');
    })
}).catch((error: any) => {
    console.error('Impossible de démarrer le serveur:', error);
});
