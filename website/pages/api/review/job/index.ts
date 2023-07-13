import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import JobReviewDocument from "src/database/models/JobReview";
import connectToDb from "src/database/mongo-db";
import { validateLocation } from "src/lib/validator/location";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
      case "POST":
        await handlePost(req, res);
        break;
      case "PATCH":
        await handlePatch(req, res);
        break;
      case "DELETE":
        await handleDelete(req, res);
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
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyID, userID } = req.query;
  await connectToDb();
  if (!companyID && !userID) {
    //get the recent
    const jobReviews = await JobReviewDocument.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("company role user");
    const populatedJobReviews = jobReviews.map(review => review.toObject());
    res.send(populatedJobReviews);
    return;
  }

  const jobReviews = companyID
    ? await JobReviewDocument.find({ company: companyID }).populate(
        "company role user"
      )
    : await JobReviewDocument.find({ user: userID }).populate(
        "company role user"
      );

  const populatedJobReviews = jobReviews.map(review => review.toObject());
  res.send(populatedJobReviews);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user) {
    throw "Not authorized";
  }
  const uid = user.id;
  await connectToDb();
  const count = await JobReviewDocument.countDocuments({ user: uid });
  if (count >= 10 && process.env.NEXT_PUBLIC_DATABASE === "PROD") {
    throw "User limited to 10 job reviews";
  }
  const {
    role,
    company,
    verified,
    anonymous,
    salary,
    review,
    coopNumber,
    mentorshipRating,
    workLifeRating,
    meaningfulRating,
    location,
    jobTerm,
  } = req.body;
  if (
    !role ||
    !company ||
    !mentorshipRating ||
    !workLifeRating ||
    !meaningfulRating
  ) {
    throw "Missing required information";
  }
  if (salary <= 0) {
    throw "Invalid Salary";
  }
  if (coopNumber < 0) {
    return "Invalid coop number";
  }
  if (review.length > 320) {
    throw "Review must be less than 320 characters";
  }
  if (!validateLocation(location)) {
    throw "Invalid Location";
  }
  const newReview = new JobReviewDocument({
    role: role.id,
    company: company.id,
    user: uid,
    mentorshipRating: mentorshipRating * 20,
    workLifeRating: workLifeRating * 20,
    meaningfulRating: meaningfulRating * 20,
    verified,
    anonymous,
    salary,
    review,
    date: new Date().getTime(),
    coopNumber,
    location,
    jobTerm,
  });
  await newReview.save();
  res.status(200).end();
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user) {
    throw "Not authorized";
  }
  const uid = user.id;
  await connectToDb();
  const count = await JobReviewDocument.countDocuments({ user: uid });
  if (count >= 10 && process.env.NEXT_PUBLIC_DATABASE === "PROD") {
    throw "User limited to 10 job reviews";
  }
  const {
    id,
    role,
    company,
    mentorshipRating,
    workLifeRating,
    meaningfulRating,
    verified,
    anonymous,
    salary,
    review,
    coopNumber,
    location,
    jobTerm,
  } = req.body;
  if (
    !id ||
    !role ||
    !company ||
    !mentorshipRating ||
    !workLifeRating ||
    !meaningfulRating
  ) {
    throw "Missing required information";
  }
  if (salary <= 0) {
    throw "Invalid Salary";
  }
  if (coopNumber < 0) {
    return "Invalid coop number";
  }
  if (review.length > 320) {
    throw "Review must be less than 320 characters";
  }
  if (!validateLocation(location)) {
    throw "Invalid Location";
  }
  await JobReviewDocument.findOneAndUpdate(
    { _id: id, user: uid },
    {
      role: role.id,
      company: company.id,
      user: uid,
      mentorshipRating: mentorshipRating * 20,
      workLifeRating: workLifeRating * 20,
      meaningfulRating: meaningfulRating * 20,
      verified,
      anonymous,
      salary,
      review,
      coopNumber,
      location,
      jobTerm,
    },
    { upsert: false }
  );
  res.status(200).end();
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user) {
    throw "Not authorized";
  }
  const uid = user.id;
  await connectToDb();
  const { id } = req.query;
  if (!id) {
    throw "Missing required information";
  }
  await JobReviewDocument.findOneAndDelete({ _id: id, user: uid });
  res.status(200).end();
};
