import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DATABSE_NAME } from "../lib/consts";

dotenv.config();

export const connectToDb = () => {
  if (mongoose.connection.readyState >= 1) return;
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5tyquge.mongodb.net/${DATABSE_NAME}?retryWrites=true&w=majority`;
  return mongoose.connect(uri, {
    autoIndex: true,
  });
}