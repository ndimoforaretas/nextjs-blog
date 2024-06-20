import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection with MongoDB is successful");
  } catch (error) {
    console.log("db connecting error", error);
  }
};
export default connectDB;
