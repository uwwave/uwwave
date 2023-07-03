import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobRecommendationsDocument from "src/database/models/JobRecommendations";
import { IJobRecommendations } from "src/lib/requests/Requests";

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
  const jobRecommendations: IJobRecommendations[] = req.body.jobRecommendations;
  if (req.body.password !== process.env.DB_PASS) {
    res.status(403).end();
  }
  await connectToDb();
  try {
    await JobRecommendationsDocument.deleteMany({});
    const documents = jobRecommendations.map(job => ({
      jobID: job.jobID,
      jobRecommendations: job.jobRecommendations,
    }));

    await JobRecommendationsDocument.insertMany(documents);
    const currentJobRecommendations = await JobRecommendationsDocument.find();
    const jobRocommendationsObjects = currentJobRecommendations.map(x =>
      x.toObject()
    );
    const out: { [key: string]: string[] } = {};
    for (const job of jobRocommendationsObjects as any) {
      out[job.jobID] = [...job.jobRecommendations];
    }
    res.status(200).send({ jobs: out });
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
