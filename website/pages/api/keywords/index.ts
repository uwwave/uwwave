import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobKeywordsDocuments from "src/database/models/JobKeywords";
import { IJobKeyword } from "src/lib/requests/Requests";
import { parseJobKeywords } from "src/lib/JobKeywordParse/jobKeywordParse";

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
    res.status(403).end(err);
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const newKeywords: IJobKeyword[] = req.body.jobKeywords;
  if (req.body.password !== process.env.DB_PASS) {
    res.status(403).end();
  }
  try {
    parseJobKeywords(JSON.stringify(newKeywords));
  } catch (error) {
    res.status(400).end();
  }
  await connectToDb();
  try {
    await JobKeywordsDocuments.deleteMany({});
    const documents = newKeywords.map(job => ({
      jobID: job.jobID,
      keywords: job.keywords,
    }));

    await JobKeywordsDocuments.insertMany(documents);
    const jobKeywords = await JobKeywordsDocuments.find();
    const jobKeywordsObjects = jobKeywords.map(x => x.toObject());
    const out: { [key: string]: string[] } = {};
    for (const job of jobKeywordsObjects as any) {
      out[job.jobID] = [...job.keywords];
    }
    res.status(200).send({ jobs: out });
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
