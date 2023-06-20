import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import CompanyInfoDocument from "src/database/models/CompanyDomains";

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
    res.status(403).end(String(err));
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companies } = req.body;
  const companyNames = companies as string[];
  await connectToDb();
  const existingCompanyDocs = await CompanyInfoDocument.find({
    companyName: { $in: companyNames },
  }).exec();
  const existingNames = existingCompanyDocs.map(obj => obj.companyName);
  const newObjects = companyNames
    .filter(name => !existingNames.includes(name))
    .map(name => ({ companyName: name }));
  if (newObjects.length > 0) {
    await CompanyInfoDocument.create(newObjects);
  }
  res.status(200).end();
};
