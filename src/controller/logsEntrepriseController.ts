// src/controller/logsBanController.ts

import LogsModelEntreprise from "../model/LogsEntreprise";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogEntreprise = createLogGeneric(LogsModelEntreprise);
export const getLogEntreprise = getLogCountGeneric(LogsModelEntreprise);
export const getAllLogsEntreprisePaginate = getAllLogsPaginateGeneric(LogsModelEntreprise);
export const viewEntrepriseController = viewGeneric(LogsModelEntreprise);