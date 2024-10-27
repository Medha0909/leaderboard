const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MongoDB URI not defined in environment variables");
  process.exit(1);
}

const connectDb = () => {
  try {
    mongoose.connect(mongoUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error: ", error);
    process.exit(1);
  }
};
module.exports = connectDb;
