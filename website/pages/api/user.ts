import type { NextApiRequest, NextApiResponse } from "next";
import UserDataDocument from "src/database/models/UserData";
import connectToDb from "src/database/mongo-db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
        res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(403).end(err);
  }
};

export default handler;
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    throw "ID not provided";
  }
  await connectToDb();
  const user = await UserDataDocument.findById(id);
  if (!user) {
    throw "User not found";
  }
  res.send(user.toObject());
};
