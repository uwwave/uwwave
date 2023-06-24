import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobRole } from "src/database/models/JobRole";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IUserData } from "src/database/models/UserData";
import CompanyDomains from "src/database/models/CompanyDomains";
import JobRole from "src/database/models/JobRole";
import UserData from "src/database/models/UserData";
import {
  IInterviewResource,
  InterviewStatus,
} from "src/lib/hooks/useAddReviewModal";

export interface IInterviewReview {
  role: IJobRole;
  company: ICompanyClearbitData;
  user: IUserData;
  id: string;
  difficulty: number;
  status: InterviewStatus;
  verified: boolean;
  anonymous: boolean;
  review: string;
  resources: IInterviewResource[];
  date: number;
  upvoters: string[];
  downvoters: string[];
}

const schema: Schema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CompanyDomains,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: JobRole,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserData,
  },
  review: {
    type: String,
  },
  status: {
    type: String,
  },
  resources: [
    {
      resourceType: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  difficulty: {
    type: Number,
  },
  salary: {
    type: Number,
  },
  verified: {
    type: Boolean,
  },
  anonymous: {
    type: Boolean,
  },
  date: {
    type: Number,
  },
  upvoters: [
    {
      type: String,
    },
  ],
  downvoters: [
    {
      type: String,
    },
  ],
});

interface InterviewReviewModel extends Model<IInterviewReview> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.InterviewReview as IInterviewReview &
  Document &
  InterviewReviewModel) ||
  mongoose.model<IInterviewReview & Document>("InterviewReview", schema);
