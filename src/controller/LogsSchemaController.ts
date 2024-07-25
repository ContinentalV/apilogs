import { Request, Response, NextFunction } from 'express';
import LogSchemaModel from '../model/LogsSchemaModel';
import { createLogSchemaGeneric, createDynamicLogGeneric } from '../functions/controllerUtility';

export const createLogSchema = createLogSchemaGeneric(LogSchemaModel);
export const createDynamicLog = createDynamicLogGeneric(LogSchemaModel);
