import mongoose, { Schema, Document, Model } from "mongoose";
import { IJobRoles } from "src/lib/requests/Requests";

const schema: Schema = new mongoose.Schema({
  jobID: {
    type: String,
    required: [true, "jobID is required"],
  },
  roles: [
    {
      type: String,
      required: [true, "roles is required"],
    },
  ],
});

interface JobToRoleModel extends Model<IJobRoles> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.JobToRole as IJobRoles &
  Document &
  JobToRoleModel) || mongoose.model<IJobRoles & Document>("JobToRole", schema);
