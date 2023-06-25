import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import UserDataDocument from "src/database/models/UserData";
import connectToDb from "src/database/mongo-db";
import { isValidProfile } from "src/lib/types/profiles";

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
  await connectToDb();
  const { photo } = req.body;
  if (!photo) {
    throw "Missing required information";
  }
  if (!isValidProfile(photo)) {
    throw "Invalid profile photo";
  }
  await UserDataDocument.findOneAndUpdate(
    { _id: user.id },
    {
      profilePicture: photo,
    }
  );
  res.status(200).end();
};
