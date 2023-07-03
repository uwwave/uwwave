import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobRecommendationsDocument from "src/database/models/JobRecommendations";

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
    res.status(403).end(err);
  }
};

export default handler;

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const jobID = req.query.jobID as string;
    if (!jobID) {
      throw "Job jobID provided";
    }
    const jobRecommendations = await JobRecommendationsDocument.findOne({
      jobID,
    });
    if (!jobRecommendations) {
      res.send([]);
      return;
    }
    res.send(jobRecommendations.jobRecommendations);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
