import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnect = async () => {
  try {
    const connectioInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(`\n MongoDB Connection Successful`);
    console.log(`\n DB_HOST: ${connectioInstance.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB!`);
    process.exit(1);
  }
};

export default dbConnect;
