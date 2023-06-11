import mongoose from "mongoose";

export default async function connectToDb() {
  if (mongoose.connection.readyState >= 1) return;
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5tyquge.mongodb.net/?retryWrites=true&w=majority`;
  console.log(uri);
  return mongoose.connect(uri, {
    autoIndex: true,
  });
}
