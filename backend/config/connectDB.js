import mongoose from "mongoose";

const connectDB = async () => {
  try {

    const mongoURI = process.env.NODE_ENV === "production" ? process.env.MONGO_ATLAS_URI : process.env.MONGO_LOCAL_URI;
    console.log("mongoURI", mongoURI);

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Connection String: ${conn.connection._connectionString}`);
    console.log(`MongoDB Name: ${conn.connection.name}`);

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;