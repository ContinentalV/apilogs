// src/controller/logsBanController.ts

import LogsModelIllegal from "../model/LogsIllegal";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogIllegal = createLogGeneric(LogsModelIllegal);
export const getLogIllegal = getLogCountGeneric(LogsModelIllegal);
export const getAllLogsIllegalPaginate = getAllLogsPaginateGeneric(LogsModelIllegal);
export const viewIllegalController = viewGeneric(LogsModelIllegal);