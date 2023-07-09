"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
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
schema.set("toObject", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    },
});
exports.default = mongoose_1.default.models.CompanyDomains ||
    mongoose_1.default.model("CompanyDomains", schema);
