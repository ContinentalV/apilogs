import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from './controllerUtility';
import { createDataDb, createQuery, countDocuments, findWithPagination, viewAll, validateDataTypes } from './utility';
import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
const mongoose = require('mongoose');
const dayjs = require('dayjs');
// Mocking mongoose model
const MockModel = {
    distinct: jest.fn(),
    schema: {
        path: jest.fn()
    },
    countDocuments: jest.fn(),
    find: jest.fn()
} as unknown as jest.Mocked<Model<Document>>;

// Mocking utility functions
jest.mock('./utility', () => ({
    createDataDb: jest.fn(),
    createQuery: jest.fn(),
    countDocuments: jest.fn(),
    findWithPagination: jest.fn(),
    viewAll: jest.fn(),
    validateDataTypes: jest.fn()
}));

// Mocking Express request, response, and next function
const mockRequest = (data: { body?: any; query?: any; } = {}) => ({
    body: data.body || {},
    query: data.query || {}
}) as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn() as NextFunction;

describe('Controller Utility Functions', () => {

    describe('createLogGeneric', () => {
        test('should create log', async () => {
            const req = mockRequest({ body: { title: 'test log' } });
            const res = mockResponse();
            await createLogGeneric(MockModel)(req, res, mockNext);
            expect(validateDataTypes).toHaveBeenCalledWith(req.body, MockModel);
            expect(createDataDb).toHaveBeenCalledWith(MockModel, req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith("Logs created");
        });

        test('should handle error', async () => {
            const req = mockRequest({ body: { title: 'test log' } });
            const res = mockResponse();
            const error = new Error('Test Error');
            (createDataDb as jest.Mock).mockRejectedValueOnce(error);
            await createLogGeneric(MockModel)(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getLogCountGeneric', () => {
        test('should get log count', async () => {
            const req = mockRequest({ query: { search: 'test', title: 'test title' } });
            const res = mockResponse();
            (createQuery as jest.Mock).mockReturnValue({});
            (countDocuments as jest.Mock).mockResolvedValueOnce(10);
            await getLogCountGeneric(MockModel)(req, res, mockNext);
            expect(createQuery).toHaveBeenCalledWith('test', 'test title');
            expect(countDocuments).toHaveBeenCalledWith(MockModel, {});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ count: 10 });
        });

        test('should handle error', async () => {
            const req = mockRequest({ query: { search: 'test', title: 'test title' } });
            const res = mockResponse();
            const error = new Error('Test Error');
            (countDocuments as jest.Mock).mockRejectedValueOnce(error);
            await getLogCountGeneric(MockModel)(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getAllLogsPaginateGeneric', () => {
        test('should get all logs with pagination', async () => {
            const req = mockRequest({ query: { search: 'test', title: 'test title', page: 1, limit: 10 } });
            const res = mockResponse();
            const mockLogs = [{ title: 'log1' }, { title: 'log2' }];
            (createQuery as jest.Mock).mockReturnValue({});
            (findWithPagination as jest.Mock).mockResolvedValueOnce(mockLogs);
            (countDocuments as jest.Mock).mockResolvedValueOnce(2);
            (MockModel.distinct as jest.Mock).mockResolvedValueOnce(['title1', 'title2']);
            await getAllLogsPaginateGeneric(MockModel)(req, res, mockNext);
            expect(createQuery).toHaveBeenCalledWith('test', 'test title', undefined, undefined, undefined, undefined, undefined);
            expect(findWithPagination).toHaveBeenCalledWith(MockModel, {}, 1, 10);
            expect(countDocuments).toHaveBeenCalledWith(MockModel, {});
            expect(MockModel.distinct).toHaveBeenCalledWith('title');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockLogs, totals: 2, titles: ['title1', 'title2'] });
        });

        test('should handle error', async () => {
            const req = mockRequest({ query: { search: 'test', title: 'test title', page: 1, limit: 10 } });
            const res = mockResponse();
            const error = new Error('Test Error');
            (findWithPagination as jest.Mock).mockRejectedValueOnce(error);
            await getAllLogsPaginateGeneric(MockModel)(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('viewGeneric', () => {
        test('should view all logs', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const mockLogs = [{ title: 'log1' }, { title: 'log2' }];
            (viewAll as jest.Mock).mockResolvedValueOnce(mockLogs);
            await viewGeneric(MockModel)(req, res, mockNext);
            expect(viewAll).toHaveBeenCalledWith(MockModel);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockLogs);
        });

        test('should handle error', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const error = new Error('Test Error');
            (viewAll as jest.Mock).mockRejectedValueOnce(error);
            await viewGeneric(MockModel)(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

});

