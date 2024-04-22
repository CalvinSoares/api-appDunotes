import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connectToDataBase = async () => {
  try {
    const connection = mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@dunotes.3b3zpnd.mongodb.net/`
    );
    if (connection) {
      console.log("connection established");
    }
  } catch (err) {
    console.log("error in connectionToDataBase", err);
    throw err;
  }
};

export default connectToDataBase;
