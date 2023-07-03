import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobRecommendations } from "src/lib/requests/Requests";

const schema: Schema = new mongoose.Schema({
  jobID: {
    type: String,
    required: [true, "jobID is required"],
  },
  jobRecommendations: [
    {
      type: String,
      required: [true, "jobRecommendations is required"],
    },
  ],
});

interface IJobRecommendationsModel extends Model<IJobRecommendations> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.JobRecommendation as IJobRecommendations &
  Document &
  IJobRecommendationsModel) ||
  mongoose.model<IJobRecommendations & Document>("JobRecommendation", schema);
