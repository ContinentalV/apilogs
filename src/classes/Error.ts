export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends CustomError {
    constructor() {
        super('Resource not found', 404);
    }
}

export class UnauthorizedError extends CustomError {
    constructor() {
        super('Unauthorized', 401);
    }
}

// ... other error classes ...