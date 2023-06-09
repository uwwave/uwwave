import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompanyDomain {
  id: string;
  domain: string;
  companyName: string;
}
const schema: Schema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "companyName is required"],
  },
  domain: {
    type: String,
  },
});

interface CompanyDomainsModel extends Model<ICompanyDomain> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.CompanyDomains as ICompanyDomain &
  Document &
  CompanyDomainsModel) ||
  mongoose.model<ICompanyDomain & Document>("CompanyDomains", schema);
