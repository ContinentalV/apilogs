// src/controller/logsBanController.ts

import LogsModelBan from "../model/logsBan";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogBan = createLogGeneric(LogsModelBan);
export const getLogBanCount = getLogCountGeneric(LogsModelBan);
export const getAllLogsBanPaginate = getAllLogsPaginateGeneric(LogsModelBan);
export const viewBanController = viewGeneric(LogsModelBan);