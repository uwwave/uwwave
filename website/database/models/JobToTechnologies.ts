import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobTechnologies } from "src/lib/requests/Requests";

const schema: Schema = new mongoose.Schema({
  jobID: {
    type: String,
    required: [true, "jobID is required"],
  },
  technologies: [
    {
      type: String,
      required: [true, "roles is required"],
    },
  ],
});

interface JobToTechnologiesModel extends Model<IJobTechnologies> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.JobToRole as IJobTechnologies &
  Document &
  JobToTechnologiesModel) ||
  mongoose.model<IJobTechnologies & Document>("JobToTechnologies", schema);
