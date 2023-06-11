import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompanyClearbitData {
  id: string;
  companyName: string;
  name: string;
  legalName?: string;
  domain?: string;
  domainAliases?: string[];
  site?: {
    phoneNumbers: string[];
    emailAddresses: string[];
  };
  category?: {
    sector: string;
    industryGroup: string;
    industry: string;
    subIndustry: string;
    sicCode: string;
    sic4Codes: string[];
    naicsCode: string;
    naics6Codes: string[];
  };
  tags?: string[];
  description?: string;
  foundedYear?: number;
  location?: string;
  timeZone?: string;
  utcOffset?: number;
  geo?: {
    streetNumber: string;
    streetName: string;
    subPremise: string | null;
    streetAddress: string;
    city: string;
    postalCode: string;
    state: string;
    stateCode: string;
    country: string;
    countryCode: string;
    lat: number;
    lng: number;
  };
  logo?: string;
  facebook?: {
    handle: string;
    likes: number;
  };
  linkedin?: {
    handle: string;
  };
  twitter?: {
    handle: string;
    id: string;
    bio: string;
    followers: number;
    following: number;
    location: string;
    site: string;
    avatar: string;
  };
  crunchbase?: {
    handle: string;
  };
  emailProvider?: boolean;
  type?: string;
  ticker?: string | null;
  identifiers?: {
    usEIN: string | null;
  };
  phone?: string | null;
  metrics?: {
    alexaUsRank: number;
    alexaGlobalRank: number;
    trafficRank: string;
    employees: number;
    employeesRange: string;
    marketCap: string | null;
    raised: number;
    annualRevenue: string | null;
    estimatedAnnualRevenue: string;
    fiscalYearEnd: string | null;
  };
  indexedAt?: string;
  tech?: string[];
  techCategories?: string[];
  parent?: {
    domain: string | null;
  };
  ultimateParent?: {
    domain: string | null;
  };
}
const schema: Schema = new mongoose.Schema({
  companyName: { type: String, required: true },
  name: { type: String },
  legalName: { type: String },
  domain: { type: String },
  domainAliases: [{ type: String }],
  site: {
    phoneNumbers: [{ type: String }],
    emailAddresses: [{ type: String }],
  },
  category: {
    sector: { type: String },
    industryGroup: { type: String },
    industry: { type: String },
    subIndustry: { type: String },
    sicCode: { type: String },
    sic4Codes: [{ type: String }],
    naicsCode: { type: String },
    naics6Codes: [{ type: String }],
  },
  tags: [{ type: String }],
  description: { type: String },
  foundedYear: { type: Number },
  location: { type: String },
  timeZone: { type: String },
  utcOffset: { type: Number },
  geo: {
    streetNumber: { type: String },
    streetName: { type: String },
    subPremise: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    postalCode: { type: String },
    state: { type: String },
    stateCode: { type: String },
    country: { type: String },
    countryCode: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  logo: { type: String },
  facebook: {
    handle: { type: String },
    likes: { type: Number },
  },
  linkedin: {
    handle: { type: String },
  },
  twitter: {
    handle: { type: String },
    id: { type: String },
    bio: { type: String },
    followers: { type: Number },
    following: { type: Number },
    location: { type: String },
    site: { type: String },
    avatar: { type: String },
  },
  crunchbase: {
    handle: { type: String },
  },
  emailProvider: { type: Boolean },
  type: { type: String },
  ticker: { type: String },
  identifiers: {
    usEIN: { type: String },
  },
  phone: { type: String },
  metrics: {
    alexaUsRank: { type: Number },
    alexaGlobalRank: { type: Number },
    trafficRank: { type: String },
    employees: { type: Number },
    employeesRange: { type: String },
    marketCap: { type: String },
    raised: { type: Number },
    annualRevenue: { type: String },
    estimatedAnnualRevenue: { type: String },
    fiscalYearEnd: { type: String },
  },
  indexedAt: { type: String },
  tech: [{ type: String }],
  techCategories: [{ type: String }],
  parent: {
    domain: { type: String },
  },
  ultimateParent: {
    domain: { type: String },
  },
});

interface CompanyDomainsModel extends Model<ICompanyClearbitData> {
  id: string;
}

schema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export default (mongoose.models.CompanyDomains as ICompanyClearbitData &
  Document &
  CompanyDomainsModel) ||
  mongoose.model<ICompanyClearbitData & Document>("CompanyDomains", schema);
