// src/controller/logsBanController.ts

import LogsModelStaff from "../model/LogsStaff";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogStaff = createLogGeneric(LogsModelStaff);
export const getLogStaff = getLogCountGeneric(LogsModelStaff);
export const getAllLogsStaffPaginate = getAllLogsPaginateGeneric(LogsModelStaff);
export const viewStaffController = viewGeneric(LogsModelStaff);