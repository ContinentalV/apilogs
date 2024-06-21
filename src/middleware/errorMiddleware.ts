import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

// Create a logger instance
const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
});

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the error in detail
    logger.error(`Error: ${err.message}, Status: ${err.statusCode || 500}, Stack: ${err.stack}`);

    // Print error in console
    console.error(chalk.red(`Error: ${err.message}`));

    // Send a generic error message to the client
    res.status(err.statusCode || 500).json({ message: err.message || 'An error occurred, please try again later.' });
}

