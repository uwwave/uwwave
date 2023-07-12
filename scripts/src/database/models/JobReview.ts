import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobRole } from "../../database/models/JobRole";
import { ICompanyClearbitData } from "../..//database/models/CompanyDomains";
import { IUserData } from "../../database/models/UserData";
import CompanyDomains from "../../database/models/CompanyDomains";
import JobRole from "../../database/models/JobRole";
import UserData from "../../database/models/UserData";
export interface IJobReview {
  role: IJobRole;
  company: ICompanyClearbitData;
  user: IUserData;
  id: string;
  mentorshipRating: number;
  workLifeRating: number;
  meaningfulRating: number;
  salary: number;
  verified: boolean;
  anonymous: boolean;
  review: string;
  date: number;
  upvoters: string[];
  downvoters: string[];
  coopNumber?: number;
  externalURL?: string;
  externalName?: string;
  title?: string;
  location?: string;
  jobTerm?: string;
  minSalary?: number;
  maxSalary?: number;
}

export interface IExternalReviewPost {
  role: string;
  company: string;
  user: string;
  mentorshipRating?: number;
  workLifeRating?: number;
  meaningfulRating?: number;
  salary: number;
  review?: string;
  date: number;
  upvoters: string[];
  downvoters: string[];
  externalURL: string;
  externalName: string;
  title?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
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
  mentorshipRating: {
    type: Number,
  },
  workLifeRating: {
    type: Number,
  },
  meaningfulRating: {
    type: Number,
  },
  salary: {
    type: Number,
  },
  minSalary: {
    type: Number,
  },
  maxSalary: {
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
  coopNumber: {
    type: Number,
  },
  externalURL: {
    type: String,
  },
  externalName: {
    type: String,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  jobTerm: {
    type: String
  }
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
