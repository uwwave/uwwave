import mongoose, { Schema, Document, Model } from "mongoose";
import { IMetricGoals } from "src/lib/requests/Requests";

const schema: Schema = new mongoose.Schema({
  startingAccountsCreated: {
    type: Number,
  },
  accountsCreated: {
    type: Number,
  },
  extensionInstallations: {
    type: Number,
  },
  startingExtensionInstallations: {
    type: Number,
  },
});

interface MetricGoalsModel extends Model<IMetricGoals> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.MetricGoals as IMetricGoals &
  Document &
  MetricGoalsModel) ||
  mongoose.model<IMetricGoals & Document>("MetricGoals", schema);
