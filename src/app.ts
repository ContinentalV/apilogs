import express from "express";
import logsRoute from "./routes/logsRoute";
import bodyParser from "body-parser";
import morgan from "morgan";

import {logStats, requestMonitor} from "./middleware/requestMonitor";


import {errorHandler} from "./middleware/errorMiddleware";
import {NotFoundError} from "./classes/Error";

import chalk from "chalk";





const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestMonitor)
//logStats();


//app.use("/api/v1/logs", logsRoute)
app.use('/api/v1/model', logsRoute )


app.use((req, res, next) => {
    let ip = (typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for']
        : req.headers['x-forwarded-for']?.[0]) || req.socket.remoteAddress || '';
    if (ip && ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }
    console.log(chalk.green('===================='));
    console.log(chalk.blue('URL de la requête:'), chalk.yellow(req.url));
    console.log(chalk.blue('Adresse IP de l\'auteur:'), chalk.yellow(ip));
    console.log(chalk.blue('Query:'), chalk.yellow(JSON.stringify(req.query)));
    console.log(chalk.green('===================='));
    next(new NotFoundError());
});
app.use(errorHandler);



export default app;