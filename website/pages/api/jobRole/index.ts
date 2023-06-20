import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobRoleDocument from "src/database/models/JobRole";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        await handlePost(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(403).end(String(err));
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roles } = req.body;
  const roleNames = roles as string[];
  await connectToDb();
  const existingDocs = await JobRoleDocument.find({
    role: { $in: roleNames },
  }).exec();
  const existingNames = existingDocs.map(obj => obj.role);
  const newObjects = roleNames
    .filter(name => !existingNames.includes(name))
    .map(name => ({ role: name }));
  if (newObjects.length > 0) {
    await JobRoleDocument.create(newObjects);
  }
  res.status(200).end();
};
