import mongoose from "mongoose";
export const connectMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    await mongoose.connect(process.env.MONGO_URL);
    return console.log("mongodb is connected");
};