import db from "../config/db";
import { exit } from "process";


const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Database cleared");
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

if(process.argv.includes('--clear')){
  clearDB();
} 