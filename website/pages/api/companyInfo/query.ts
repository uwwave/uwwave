import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import CompanyInfoDocument from "src/database/models/CompanyDomains";

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
  const { company } = req.query;
  await connectToDb();
  const results = await CompanyInfoDocument.find({
    companyName: { $regex: company, $options: "i" },
  })
    .limit(7)
    .exec();
  res.send(results.map(x => x.toObject()));
};
