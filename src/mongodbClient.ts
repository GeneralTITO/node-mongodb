import mongoose from "mongoose";
import "dotenv/config";
import Redis from "ioredis";


export const redisClient = Redis.createClient();



const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
export default connectToDatabase;