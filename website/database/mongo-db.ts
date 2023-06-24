import mongoose from "mongoose";

export default async function connectToDb() {
  if (mongoose.connection.readyState >= 1) return;
  const prodName = "test";
  const stagingName = "staging";
  const databaseName =
    process.env.NEXT_PUBLIC_DATABASE === "PROD" ? prodName : stagingName;
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5tyquge.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri, {
    autoIndex: true,
  });
}
