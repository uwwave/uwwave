import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import JobReview from "src/database/models/JobReview";
import connectToDb from "src/database/mongo-db";

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
    console.log(err);
    res.status(403).end(err);
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user) {
    throw "Not authorized";
  }
  const uid = user.id;
  await connectToDb();
  const { upvotedReviews, downvotedReviews } = req.body;
  if (!upvotedReviews || !downvotedReviews) {
    throw "Missing required information";
  }

  // Update upvoted reviews
  await updateReviewVotes(uid, upvotedReviews, downvotedReviews);

  res.status(200).end();
};

const updateReviewVotes = async (
  userId: string,
  upvoteReviews: string[],
  downvoteReviews: string[]
) => {
  try {
    for (const review of upvoteReviews) {
      const reviewDoc = await JobReview.findById(review).populate("user");
      if (!reviewDoc) {
        continue;
      }
      if (reviewDoc.user.id === userId) {
        // you can't vote on your own
        continue;
      }
      const index = reviewDoc.upvoters
        ?.map(x => x.toString())
        .findIndex(x => x === userId);
      if (index > -1) {
        reviewDoc.upvoters?.splice(index, 1);
      } else {
        reviewDoc.upvoters.push(userId as any);
      }
      await reviewDoc.save();
    }

    for (const review of downvoteReviews) {
      const reviewDoc = await JobReview.findById(review).populate("user");
      if (!reviewDoc) {
        continue;
      }
      console.log(reviewDoc.user.id, userId);
      if (reviewDoc.user.id === userId) {
        // you can't vote on your own
        continue;
      }
      const index = reviewDoc.downvoters
        ?.map(x => x.toString())
        .findIndex(x => x === userId);
      if (index > -1) {
        reviewDoc.downvoters?.splice(index, 1);
      } else {
        reviewDoc.downvoters.push(userId as any);
      }
      await reviewDoc.save();
    }
  } catch (error) {
    throw new Error(`Error updating upvoters: ${error}`);
  }
};
