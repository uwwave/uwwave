import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import JobReviewDocument from "src/database/models/JobReview";
import connectToDb from "src/database/mongo-db";

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
  if (!companyID && !userID) {
    throw "must provied companyID or userID not provided";
  }
  await connectToDb();
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
  if (count >= 10) {
    throw "User limited to 10 job reviews";
  }
  const { role, company, rating, verified, anonymous, salary, review } =
    req.body;
  if (!role || !company || !rating) {
    throw "Missing required information";
  }
  if (salary <= 0) {
    throw "Invalid Salary";
  }
  const newReview = new JobReviewDocument({
    role: role.id,
    company: company.id,
    user: uid,
    rating: rating * 20,
    verified,
    anonymous,
    salary,
    review,
    date: new Date().getTime(),
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
  if (count >= 10) {
    throw "User limited to 10 job reviews";
  }
  const { id, role, company, rating, verified, anonymous, salary, review } =
    req.body;
  if (!id || !role || !company || !rating) {
    throw "Missing required information";
  }
  if (salary <= 0) {
    throw "Invalid Salary";
  }
  await JobReviewDocument.findOneAndUpdate(
    { _id: id, user: uid },
    {
      role: role.id,
      company: company.id,
      user: uid,
      rating: rating * 20,
      verified,
      anonymous,
      salary,
      review,
      date: new Date().getTime(),
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
