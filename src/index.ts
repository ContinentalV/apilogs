import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan, {TokenIndexer } from "morgan";
import app from './app';

dotenv.config();
import mongoose from 'mongoose';
import dbConnect from "./config/database";
import logsRoute from "./routes/logsRoute";



const port = 3000;


app.get('/', (req: Request, res: Response) => {
    res.send('Bonjour, Maître Getsu le Grand!');
});



dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`▪️Serveur en cours d'exécution sur http://localhost:${port}`);
        console.log('▪️Base de données connectée avec succès✅✅');
    });
}).catch((error:any) => {
    console.error('Impossible de démarrer le serveur:', error);
});