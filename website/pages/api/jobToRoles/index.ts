import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobToRolesDocument from "src/database/models/JobToRoles";
import { IJobRoles } from "src/lib/requests/Requests";

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
  const jobRoles: IJobRoles[] = req.body.jobRoles;
  if (req.body.password !== process.env.DB_PASS) {
    res.status(403).end();
  }
  await connectToDb();
  try {
    await JobToRolesDocument.deleteMany({});
    const documents = jobRoles.map(job => ({
      jobID: job.jobID,
      roles: job.roles,
    }));

    await JobToRolesDocument.insertMany(documents);
    const currentJobRoles = await JobToRolesDocument.find();
    const jobRolesObjects = currentJobRoles.map(x => x.toObject());
    const out: { [key: string]: string[] } = {};
    for (const job of jobRolesObjects as any) {
      out[job.jobID] = [...job.roles];
    }
    res.status(200).send({ jobs: out });
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
