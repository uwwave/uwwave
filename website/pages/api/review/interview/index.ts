import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import InterviewReviewDocument from "src/database/models/InterviewReview";
import connectToDb from "src/database/mongo-db";
import {
  IInterviewResourceDisplay,
  getInterviewResourceValidator,
} from "src/components/InterviewResources/InterviewResources";

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
  const reviews = companyID
    ? await InterviewReviewDocument.find({ company: companyID }).populate(
        "company role user"
      )
    : await InterviewReviewDocument.find({ user: userID }).populate(
        "company role user"
      );

  const populatedReviews = reviews.map(review => review.toObject());
  res.send(populatedReviews);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user) {
    throw "Not authorized";
  }
  const uid = user.id;
  await connectToDb();
  const count = await InterviewReviewDocument.countDocuments({ user: uid });
  if (count >= 30 && process.env.NEXT_PUBLIC_DATABASE === "PROD") {
    throw "User limited to 30 interview reviews";
  }
  const {
    role,
    company,
    difficulty,
    verified,
    anonymous,
    review,
    status,
    resources,
  } = req.body;
  if (!role || !company || !difficulty || !status || !resources) {
    throw "Missing required information";
  }
  if (review.length > 320) {
    throw "Review must be less than 320 characters";
  }
  if (resources.length > 5) {
    throw "Limited to 5 resources per interview review";
  }
  const filteredResources = resources
    .filter((x: IInterviewResourceDisplay) => {
      return getInterviewResourceValidator(x.resourceType)(x.value);
    })
    .map((x: any) => {
      delete x.isEditMode;
      return x;
    });
  const newReview = new InterviewReviewDocument({
    role: role.id,
    company: company.id,
    user: uid,
    difficulty: difficulty * 20,
    verified,
    anonymous,
    status,
    resources: filteredResources,
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
  const count = await InterviewReviewDocument.countDocuments({ user: uid });
  if (count >= 30 && process.env.NEXT_PUBLIC_DATABASE === "PROD") {
    throw "User limited to 30 interview reviews";
  }
  const {
    id,
    role,
    company,
    difficulty,
    verified,
    anonymous,
    review,
    status,
    resources,
  } = req.body;
  if (!id || !role || !company || !difficulty || !status || !resources) {
    throw "Missing required information";
  }
  if (review.length > 320) {
    throw "Review must be less than 320 characters";
  }
  if (resources.length > 5) {
    throw "Limited to 5 resources per interview review";
  }
  const filteredResources = resources
    .filter((x: IInterviewResourceDisplay) => {
      return getInterviewResourceValidator(x.resourceType)(x.value);
    })
    .map((x: any) => {
      delete x.isEditMode;
      return x;
    });
  await InterviewReviewDocument.findOneAndUpdate(
    { _id: id, user: uid },
    {
      role: role.id,
      company: company.id,
      user: uid,
      difficulty: difficulty * 20,
      verified,
      anonymous,
      status,
      resources: filteredResources,
      review,
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
  await InterviewReviewDocument.findOneAndDelete({ _id: id, user: uid });
  res.status(200).end();
};
