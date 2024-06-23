// src/controller/logsBanController.ts

import LogsModelInventory from "../model/LogsInventory"
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogInventory = createLogGeneric(LogsModelInventory);
export const getLogInventory = getLogCountGeneric(LogsModelInventory);
export const getAllLogsInventoryPaginate = getAllLogsPaginateGeneric(LogsModelInventory);
export const viewInventoryController = viewGeneric(LogsModelInventory);