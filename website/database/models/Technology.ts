import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITechnology {
  technology: string;
  id: string;
}
const schema: Schema = new mongoose.Schema({
  technology: {
    type: String,
    required: [true, "technology is required"],
  },
});

interface TechnologyModel extends Model<ITechnology> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.Technology as ITechnology &
  Document &
  TechnologyModel) ||
  mongoose.model<ITechnology & Document>("Technology", schema);
