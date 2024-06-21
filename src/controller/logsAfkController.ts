// src/controller/logsAfkController.ts

import LogsModelAfk from "../model/LogsAfk";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogAfk = createLogGeneric(LogsModelAfk);
export const getLogAfkCount = getLogCountGeneric(LogsModelAfk);
export const getAllLogsAfkPaginate = getAllLogsPaginateGeneric(LogsModelAfk);
export const viewAfkController = viewGeneric(LogsModelAfk);