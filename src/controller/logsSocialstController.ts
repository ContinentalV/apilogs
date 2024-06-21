// src/controller/logsArgentController.ts

import LogsModelSocial from "../model/logsSocials";
import { createLogGeneric, getLogCountGeneric, getAllLogsPaginateGeneric, viewGeneric } from '../functions/controllerUtility';

export const createLogLogsSocials = createLogGeneric(LogsModelSocial);
export const getLogLogsSocialsCount = getLogCountGeneric(LogsModelSocial);
export const getAllLogsLogsSocialsPaginate = getAllLogsPaginateGeneric(LogsModelSocial);
export const viewLogsSocialsController = viewGeneric(LogsModelSocial);