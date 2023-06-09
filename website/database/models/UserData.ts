import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserData {
  username: string;
  id: string;
  dateJoined?: number;
  profilePicture?: string;
  isAdmin?: boolean;
}

const schema: Schema = new mongoose.Schema({
  uid: {
    type: String,
  },
  username: {
    type: String,
  },
  dateJoined: {
    type: Number,
  },
  profilePicture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

interface UserModel extends Model<IUserData> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.userdatas as IUserData &
  Document &
  UserModel) || mongoose.model<IUserData & Document>("userdatas", schema);
