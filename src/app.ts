import express from "express";
import logsRoute from "./routes/logsRoute";
import bodyParser from "body-parser";
import morgan from "morgan";
import indexRoute from "./routes/indexRoute";
import {logStats, requestMonitor} from "./middleware/requestMonitor";
import logsArgentRoute from "./routes/logsArgentRoute";
import logsAfkRoute from "./routes/logsAfkRoute";
import logsBanRoute from "./routes/logsBanRoute";
import {errorHandler} from "./middleware/errorMiddleware";
import {NotFoundError} from "./classes/Error";
import logsSocialsRoute from "./routes/logsSocialsRoute";
import chalk from "chalk";

import logsInventoryRoute from "./routes/logsInventoryRoute";
import logsEntrepriseRoute from "./routes/logsEntrepriseRoute";
import logsIllegalRoute from "./routes/logsIllegalRoute";
import logsStaffRoute from "./routes/logsStaffRoute";



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestMonitor)
//logStats();


app.use("/api/v1/logs", logsRoute)
app.use("/api/v1/logs/argent", logsArgentRoute)
app.use("/api/v1/logs/afk", logsAfkRoute)
app.use("/api/v1/logs/ban",logsBanRoute)
app.use("/api/v1/logs/socials",logsSocialsRoute)
app.use("/api/v1/logs/entreprise", logsEntrepriseRoute)
app.use("/api/v1/logs/illegal", logsIllegalRoute)
app.use("/api/v1/logs/inventory", logsInventoryRoute)
app.use("/api/v1/logs/staff", logsStaffRoute)
app.use("/api/v1/indexes", indexRoute);


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