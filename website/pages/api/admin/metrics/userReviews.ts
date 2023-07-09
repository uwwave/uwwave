import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import JobReviewDocument from "src/database/models/JobReview";
import InterviewReviewDocument from "src/database/models/InterviewReview";
import connectToDb from "src/database/mongo-db";
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
    console.log(err);
    res.status(400).end(err);
  }
};

export default handler;

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user.isAdmin) {
    throw "Must be signed in admin";
  }
  await connectToDb();
  const jobReviews = await JobReviewDocument.countDocuments({
    externalURL: { $exists: false },
  });
  const interviewReviews = await InterviewReviewDocument.countDocuments();

  res.send({ jobReviews, interviewReviews });
};
