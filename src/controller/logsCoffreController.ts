// src/controller/logsBanController.ts

import LogsModelCoffre from "../model/LogsCoffre";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogCoffre = createLogGeneric(LogsModelCoffre);
export const getLogCoffre = getLogCountGeneric(LogsModelCoffre);
export const getAllLogsCoffrePaginate = getAllLogsPaginateGeneric(LogsModelCoffre);
export const viewCoffreController = viewGeneric(LogsModelCoffre);