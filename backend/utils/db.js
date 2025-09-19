import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔑 Mongo URI:", process.env.MONGO_URI); // Debugging
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('mongodb connected');
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
