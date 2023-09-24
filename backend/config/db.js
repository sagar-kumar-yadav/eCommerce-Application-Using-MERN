import colors from "colors";
import mongoose from "mongoose";

// here we connect database with server
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `connected to mongodb database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

export default connectDB;
