import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobKeywordsDocuments from "src/database/models/JobKeywords";
import { IJobKeyword } from "src/lib/requests/Requests";
import { parseJobKeywords } from "src/lib/JobKeywordParse/jobKeywordParse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
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

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const jobIDs = JSON.parse(req.query.jobIDs as string) as string[];
    if (!jobIDs || jobIDs.length === 0) {
      const jobKeywords = await JobKeywordsDocuments.find();
      const out = jobKeywords.map(x => x.toObject());
      res.status(200).json(out);
    } else {
      const out = [];
      for (const id of jobIDs) {
        const job = await JobKeywordsDocuments.findOne({ jobID: id });
        if (job) {
          out.push(job.toObject());
        } else {
          out.push({
            jobID: id,
            keywords: [],
          });
        }
      }
      res.status(200).json(out);
    }
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    for (const job of newKeywords) {
      // Document doesn't exist, create a new one
      const newDoc = new JobKeywordsDocuments({
        jobID: job.jobID,
        keywords: job.keywords,
      });
      await newDoc.save();
    }
    const jobKeywords = await JobKeywordsDocuments.find();
    const out = jobKeywords.map(x => x.toObject());
    res.status(200).send(out);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
