import mongoose from 'mongoose';
import 'dotenv/config'
import chalk from 'chalk';

const dbName = `${process.env.db_name}`; 
const url = `${process.env.MONGO_URL}/${dbName}`;

const connectToDB=async()=>{
    try {
        await mongoose.connect(url);
        mongoose.connection.on("open", () => {
          console.log(chalk.white.bold.bgGreen("MongoDB connected"));
        });
        mongoose.connection.on("error", () => {
          console.error(chalk.bold.bgRed("Error in connecting MongoDB"));
        });
    } catch (error) {
        console.error(chalk.bold.bgRed("MongoDB connection error: ", error));
    }
}
export default connectToDB;
