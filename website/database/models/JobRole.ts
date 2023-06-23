import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobRole {
  role: string;
  id: string;
}
const schema: Schema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "role is required"],
  },
});

interface JobRoleModel extends Model<IJobRole> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.JobRoles as IJobRole &
  Document &
  JobRoleModel) || mongoose.model<IJobRole & Document>("JobRoles", schema);
