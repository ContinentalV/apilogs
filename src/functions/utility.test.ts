
const { createQuery, countDocuments, findWithPagination, viewAll, createDataDb, validateDataTypes, generateTimeFilter, genrateFilterMontant } = require('./utility');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

// Mocking mongoose model
const MockModel = {
    countDocuments: jest.fn(),
    find: jest.fn(),
    schema: {
        path: jest.fn()
    }
};

// Mocking the return of find method to include skip, limit, and sort
MockModel.find.mockImplementation(() => ({
    skip: jest.fn().mockImplementation(() => ({
        limit: jest.fn().mockImplementation(() => ({
            sort: jest.fn().mockResolvedValueOnce([]),
        })),
    })),
}));

describe('Test log functions', () => {

    describe('createQuery', () => {
        test('should create query with title', () => {
            const query = createQuery(undefined, 'test.title');
            expect(query).toEqual({ title: { $in: ['test', 'title'] } });
        });

        test('should create query with timestamp filter', () => {
            const query = createQuery(undefined, undefined, '2022-01-01', '2022-01-31');
            expect(query.timestamp).toBeDefined();
        });

        test('should create query with montant filter', () => {
            const query = createQuery(undefined, undefined, undefined, undefined, undefined, undefined, '>100');
            expect(query.montant).toBeDefined();
        });
    });

    describe('countDocuments', () => {
        test('should count documents', async () => {
            MockModel.countDocuments.mockResolvedValueOnce(10);
            const count = await countDocuments(MockModel, {});
            expect(count).toBe(10);
        });
    });

    describe('findWithPagination', () => {
        test('should find documents with pagination', async () => {
            const result = await findWithPagination(MockModel, {}, 1, 10);
            expect(result).toEqual([]);
        });
    });

    describe('viewAll', () => {
        test('should view all documents', async () => {
            MockModel.find.mockResolvedValueOnce([]);
            const result = await viewAll(MockModel);
            expect(result).toEqual([]);
        });
    });

    describe('createDataDb', () => {
        test('should create data in db', async () => {
            const save = jest.fn().mockResolvedValueOnce({});
            const MockDataModel = jest.fn(() => ({ save }));
            await createDataDb(MockDataModel, {});
            expect(save).toHaveBeenCalled();
        });
    });

    describe('validateDataTypes', () => {
        test('should validate data types', () => {
            MockModel.schema.path.mockImplementation(key => ({ instance: typeof key === 'string' ? 'String' : 'Number' }));
            expect(() => validateDataTypes({ title: 'Test' }, MockModel)).not.toThrow();
        });

        test('should throw error for invalid data types', () => {
            MockModel.schema.path.mockImplementation(key => ({ instance: 'String' }));
            expect(() => validateDataTypes({ title: 123 }, MockModel)).toThrow('Invalid type for field title. Expected String, got number');
        });
    });

    describe('generateTimeFilter', () => {
        test('should generate time filter', () => {
            const filter = generateTimeFilter('2022-01-01', '2022-01-31');
            expect(filter).toBeDefined();
        });
    });

    describe('genrateFilterMontant', () => {
        test('should generate montant filter', () => {
            const filter = genrateFilterMontant('>100');
            expect(filter).toBeDefined();
        });
    });

});
