import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import TechnologyDocument from "src/database/models/Technology";

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
  const { password, technologies } = req.body;
  if (password !== process.env.DB_PASS) {
    res.status(403).end();
  }
  const techNames = technologies as string[];
  await connectToDb();
  const existingDocs = await TechnologyDocument.find({
    technology: { $in: techNames },
  }).exec();
  const existingNames = existingDocs.map(obj => obj.technology);
  const newObjects = techNames
    .filter(name => !existingNames.includes(name))
    .map(name => ({ role: name }));
  if (newObjects.length > 0) {
    await TechnologyDocument.create(newObjects);
  }
  res.status(200).end();
};
