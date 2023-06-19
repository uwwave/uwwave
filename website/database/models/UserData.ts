import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserData {
  username: string;
  id: string;
}

const schema: Schema = new mongoose.Schema({
  uid: {
    type: String,
  },
  username: {
    type: String,
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

export default (mongoose.models.userdata as IUserData & Document & UserModel) ||
  mongoose.model<IUserData & Document>("userdata", schema);
