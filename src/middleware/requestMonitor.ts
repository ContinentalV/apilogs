let requestCount = 0;
let failedRequestCount = 0;
let startTime = Date.now();
let lastRequestTime = Date.now();

export const requestMonitor = (req:any, res:any, next:any) => {
    requestCount++;
    lastRequestTime = Date.now();

    res.on('finish', () => {
        if (res.statusCode >= 400) {
            failedRequestCount++;
        }
    });

    next();
};

const getStats = () => {
    const elapsedTime = (lastRequestTime - startTime) / 1000; // Temps écoulé en secondes
    const rps = requestCount / elapsedTime;
    const errorRate = failedRequestCount / requestCount;

    return {
        requestCount,
        failedRequestCount,
        elapsedTime,
        rps: rps.toFixed(2),
        errorRate: errorRate.toFixed(2),
        crashed: errorRate > 0.05 // Seuil de 5% d'erreurs
    };
};

// Fonction pour afficher les statistiques dans la console à intervalles réguliers
export const logStats = () => {
    setInterval(() => {
        const stats = getStats();
        console.log("API Performance Stats:");
        console.log(`Total Requests: ${stats.requestCount}`);
        console.log(`Failed Requests: ${stats.failedRequestCount}`);
        console.log(`Elapsed Time: ${stats.elapsedTime.toFixed(2)} seconds`);
        console.log(`Requests per Second: ${stats.rps}`);
        console.log(`Error Rate: ${stats.errorRate}`);
        console.log(`API Crashed: ${stats.crashed}`);
    }, 5000); // Intervalle de 5 secondes
};


