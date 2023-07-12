"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CompanyDomains_1 = __importDefault(require("../../database/models/CompanyDomains"));
const JobRole_1 = __importDefault(require("../../database/models/JobRole"));
const UserData_1 = __importDefault(require("../../database/models/UserData"));
const schema = new mongoose_1.default.Schema({
    company: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: CompanyDomains_1.default,
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: JobRole_1.default,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: UserData_1.default,
    },
    review: {
        type: String,
    },
    mentorshipRating: {
        type: Number,
    },
    workLifeRating: {
        type: Number,
    },
    meaningfulRating: {
        type: Number,
    },
    salary: {
        type: Number,
    },
    minSalary: {
        type: Number,
    },
    maxSalary: {
        type: Number,
    },
    verified: {
        type: Boolean,
    },
    anonymous: {
        type: Boolean,
    },
    date: {
        type: Number,
    },
    upvoters: [
        {
            type: String,
        },
    ],
    downvoters: [
        {
            type: String,
        },
    ],
    coopNumber: {
        type: Number,
    },
    externalURL: {
        type: String,
    },
    externalName: {
        type: String,
    },
    title: {
        type: String,
    },
    location: {
        type: String,
    },
    jobTerm: {
        type: String
    }
});
schema.set("toObject", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    },
});
exports.default = mongoose_1.default.models.JobReview || mongoose_1.default.model("JobReview", schema);
