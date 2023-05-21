import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobKeyword } from "src/lib/requests/Requests";

const schema: Schema = new mongoose.Schema({
  jobID: {
    type: String,
    required: [true, "jobID is required"],
  },
  keywords: [
    {
      type: String,
      required: [true, "keywords is required"],
    },
  ],
});

interface KeywordModel extends Model<IJobKeyword> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.JobKeywords as IJobKeyword &
  Document &
  KeywordModel) ||
  mongoose.model<IJobKeyword & Document>("JobKeywords", schema);
