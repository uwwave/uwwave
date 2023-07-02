import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobToTechnologiesDocument from "src/database/models/JobToTechnologies";

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
  try {
    await connectToDb();
    const jobIDs = req.body.jobIDs as string[];
    if (!jobIDs || jobIDs.length === 0) {
      const jobTechnologies = await JobToTechnologiesDocument.find();
      const out = jobTechnologies.map(x => x.toObject());
      const outObject: { [key: string]: string[] } = {};
      for (const job of out) {
        outObject[job.jobID] = [...job.technologies];
      }
      res.status(200).json({ jobs: outObject });
    } else {
      const jobs = await JobToTechnologiesDocument.find(
        { jobID: { $in: jobIDs } },
        { _id: 0 }
      ).lean();
      const jobMap = new Map(jobs.map(job => [job.jobID, job]));
      const out = jobIDs.map(
        id => jobMap.get(id) || { jobID: id, technologies: [] }
      );
      const outObject: { [key: string]: string[] } = {};
      for (const job of out) {
        outObject[job.jobID] = [...job.technologies];
      }
      res.status(200).json({ jobs: outObject });
    }
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
