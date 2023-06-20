import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobRoleDocument from "src/database/models/JobRole";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(403).end(String(err));
  }
};

export default handler;

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;
  await connectToDb();
  const results = await JobRoleDocument.find({
    role: { $regex: query, $options: "i" },
  })
    .limit(7)
    .exec();
  const out = results.map(x => x.toObject());
  res.send(out);
};
