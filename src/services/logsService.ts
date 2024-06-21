import LogsModel from "../model/Logs";




export const createLogs = async (logs: string, category: string) => {
    try {
        const newLogs = new LogsModel({
            message: logs,
            timestamp: new Date(),
            category: category
        });
        await newLogs.save();
    } catch (error: any) {
        console.error(error);
    }
}

export const getAllCount = async () => {
    try {
        return await LogsModel.countDocuments();
    } catch (error: any) {
        console.error(error);
    }
}

export const viewAllLogsPaginate = async (category?: string, page: number = 1, limit: number = 10) => {
    try {
        const query = category ? { category } : {};
        const logs = await LogsModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ timestamp: -1 }); // Tri par date décroissante


        const explainResult = await LogsModel.find(query)
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .explain("executionStats");

       // console.log("Explain Result:", explainResult);


        return logs;
    } catch (error: any) {
        console.error(error);
    }
}

export const view = async () => {
    try {
        return await LogsModel.find();
    } catch (error: any) {
        console.error(error);
    }
}