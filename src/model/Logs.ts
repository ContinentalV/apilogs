import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    // categorie General
    category: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true

    }
});

logsSchema.index({ category: 1 });
logsSchema.index({ timestamp: 1 });

export default mongoose.model("Logs", logsSchema);

//TODO


