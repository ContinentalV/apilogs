import mongoose from 'mongoose';

export const getIndexes = async () => {
    try {
        const indexes = await mongoose.connection.db.collection('logs').indexes();
        return indexes;
    } catch (error: any) {
        console.error(error);
    }
}

export const getStats = async () => {
    try {
        // Utilisation de l'agrégation pour obtenir des statistiques
        const stats = await mongoose.connection.db.collection('logs').aggregate([
            { $collStats: { storageStats: {} } }
        ]).toArray();
        return stats;
    } catch (error: any) {
        console.error(error);
    }
}
