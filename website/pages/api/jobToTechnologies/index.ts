import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobToTechnologiesDocument from "src/database/models/JobToTechnologies";
import { IJobTechnologies } from "src/lib/requests/Requests";

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
  const jobTechnologies: IJobTechnologies[] = req.body.jobTechnologies;
  if (req.body.password !== process.env.DB_PASS) {
    res.status(403).end();
  }
  await connectToDb();
  try {
    await JobToTechnologiesDocument.deleteMany({});
    const documents = jobTechnologies.map(job => ({
      jobID: job.jobID,
      technologies: job.technologies,
    }));

    await JobToTechnologiesDocument.insertMany(documents);
    const currentJobTechnologies = await JobToTechnologiesDocument.find();
    const jobToTechnologiesObject = currentJobTechnologies.map(x =>
      x.toObject()
    );
    const out: { [key: string]: string[] } = {};
    for (const job of jobToTechnologiesObject as any) {
      out[job.jobID] = [...job.technologies];
    }
    res.status(200).send({ jobs: out });
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
