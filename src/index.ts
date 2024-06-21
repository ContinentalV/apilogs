import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import app from './app';
import mongoose from 'mongoose';
import dbConnect from "./config/database";
import logsRoute from "./routes/logsRoute";

dotenv.config();

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.get('/', (req: Request, res: Response) => {
    res.send('Bonjour, Maître Getsu le Grand!');
});

dbConnect().then(() => {
    app.listen(Number(port), isProduction ? '0.0.0.0' : 'localhost', () => {
        console.log(`▪️Serveur en cours d'exécution sur http://${isProduction ? '0.0.0.0' : 'localhost'}:${port}`);
        console.log('▪️Base de données connectée avec succès✅✅');
    })
}).catch((error: any) => {
    console.error('Impossible de démarrer le serveur:', error);
});