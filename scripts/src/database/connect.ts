import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectToDb = () => {
  if (mongoose.connection.readyState >= 1) return;
  const databaseName = "staging" //"staging" or "test"
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5tyquge.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri, {
    autoIndex: true,
  });
}