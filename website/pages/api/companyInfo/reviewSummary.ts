import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import JobReviewDoc from "src/database/models/JobReview";
import InterviewReviewDoc from "src/database/models/InterviewReview";
import mongoose from "mongoose";
import { calculatePercentile } from "src/lib/stats/reviewSummary";

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
    console.log("ERROR", err);
    res.status(403).end(String(err));
  }
};

export default handler;

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    throw "Missing company ID";
  }
  await connectToDb();
  const companyID = new mongoose.Types.ObjectId(id as string);
  const reviewResult = await JobReviewDoc.aggregate([
    { $match: { company: companyID } },
    {
      $group: {
        _id: null,
        ratingAverage: {
          $avg: {
            $avg: ["$mentorshipRating", "$workLifeRating", "$meaningfulRating"],
          },
        },
        maxSalary: { $max: "$salary" },
        minSalary: { $min: "$salary" },
      },
    },
  ]);

  const interviewResult = await InterviewReviewDoc.aggregate([
    { $match: { company: companyID } },
    { $group: { _id: null, interviewAverage: { $avg: "$difficulty" } } },
  ]);

  const companyReviews = await JobReviewDoc.aggregate([
    {
      $match: { company: companyID },
    },
    {
      $group: {
        _id: null,
        salaries: { $push: "$salary" },
      },
    },
    {
      $project: {
        _id: 0,
        salaries: 1,
      },
    },
  ]);

  const allReviews = await JobReviewDoc.aggregate([
    {
      $group: {
        _id: null,
        salaries: { $push: "$salary" },
      },
    },
    {
      $project: {
        _id: 0,
        salaries: 1,
      },
    },
  ]);

  let salaryScore = null;

  if (allReviews.length && companyReviews.length) {
    const { salaries } = companyReviews[0];
    const allSalaries = allReviews[0].salaries;
    // Compute the competitiveness score
    salaryScore = calculatePercentile(salaries, allSalaries);
  }
  console.log(salaryScore);

  res.send({
    ratingAverage: reviewResult.length ? reviewResult[0].ratingAverage : null,
    minSalary: reviewResult.length ? reviewResult[0].minSalary : null,
    maxSalary: reviewResult.length ? reviewResult[0].maxSalary : null,
    salaryPercentile: salaryScore,
    interviewAverage: interviewResult.length
      ? interviewResult[0].interviewAverage
      : null,
  });
};
