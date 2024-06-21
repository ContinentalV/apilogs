// src/controller/logsArgentController.ts

import LogsModelArgent from "../model/LogsArgent";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogArgent = createLogGeneric(LogsModelArgent);
export const getLogArgentCount = getLogCountGeneric(LogsModelArgent);
export const getAllLogsArgentPaginate = getAllLogsPaginateGeneric(LogsModelArgent);
export const viewArgentController = viewGeneric(LogsModelArgent);