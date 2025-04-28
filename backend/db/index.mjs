import mongoose from 'mongoose';
import 'dotenv/config'
import chalk from 'chalk';

const dbName = process.env.db_name; 
const url = `${process.env.MONGO_URL}/${dbName}`;

mongoose.connection.on("open", () => {
  console.log(chalk.white.bold.bgGreen("MongoDB connected"));
});
mongoose.connection.on("error", (error) => {
  console.error(chalk.bold.bgRed("Error in connecting MongoDB: ", error));
});

const connectToDB = async () => {
  console.log("Connecting to MongoDB at:");
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error(chalk.bold.bgRed("MongoDB connection error: ", error));
  }
};

export default connectToDB;

