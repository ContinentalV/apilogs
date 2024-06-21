import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in the environment variables.');
        }
        await mongoose.connect(mongoUri);
    }
    catch (error){
        console.error(error);
        process.exit(1);
    }
}

export default dbConnect;