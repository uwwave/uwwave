import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobRole } from "src/database/models/JobRole";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IUserData } from "src/database/models/UserData";
import CompanyDomains from "src/database/models/CompanyDomains";
import JobRole from "src/database/models/JobRole";
import UserData from "src/database/models/UserData";
export interface IJobReview {
  role: IJobRole;
  company: ICompanyClearbitData;
  user: IUserData;
  id: string;
  rating: number;
  salary: number;
  verified: boolean;
  anonymous: boolean;
  review: string;
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
  rating: {
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

interface JobReviewModel extends Model<IJobReview> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.JobReview as IJobReview &
  Document &
  JobReviewModel) || mongoose.model<IJobReview & Document>("JobReview", schema);
