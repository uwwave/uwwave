import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import UserDataDocument from "src/database/models/UserData";
import connectToDb from "src/database/mongo-db";
import { isValidUsername } from "src/lib/server/accounts/helpers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "PATCH":
        await handlePatch(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(403).end(err);
  }
};

export default handler;

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user) {
    throw "Not authorized";
  }
  const { username } = req.body;
  if (!username) {
    throw "Missing required information";
  }
  if (!isValidUsername(username)) {
    throw "Username invalid (Must be 3-20 in length, no special characters).";
  }
  await connectToDb();
  const existingDoc = await UserDataDocument.findOne({ username });
  if (existingDoc) {
    throw "Username already exists";
  }
  await UserDataDocument.findOneAndUpdate(
    { _id: user.id },
    {
      username,
    }
  );
  res.status(200).end();
};
