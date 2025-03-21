import mongoose from "mongoose";
import "dotenv/config";
import Redis from "ioredis";


export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis', 
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully');
});



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