"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../database/connect");
const reviews = __importStar(require("../../files/user_review.json"));
const companies = __importStar(require("../../files/company.json"));
const jobs = __importStar(require("../../files/job.json"));
const JobReview_1 = __importDefault(require("../database/models/JobReview"));
const CompanyDomains_1 = __importDefault(require("../database/models/CompanyDomains"));
const fs_1 = __importDefault(require("fs"));
const DEFAULT_ROLE_ID = "649512cefa64fb130f275a86";
const DEFAULT_USER_ID = "64aa216db0c9c54d34120ed6";
const currencyConversions = {
    'USD': 1.33,
    'CAD': 1,
    'EUR': 1.46,
    'JPY': 0.0094,
    'GBP': 1.71,
    'HKD': 0.17,
    'SGD': 0.98,
    'INR': 0.016,
    'NOK': 0.13
};
const currencies = new Set();
const fire = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield (0, connect_1.connectToDb)();
    console.log("Generating documents from user_review.json");
    const existingCompanyIDs = new Set();
    const newCompanyIDs = new Set();
    const ExternalReviewPost = [];
    const filteredReviews = Object.values(reviews)
        .filter(x => Object.values(companies).find(company => { var _a; return company.id === x.company_id && ((_a = Object.values(companies).find(company => company.id === x.company_id)) === null || _a === void 0 ? void 0 : _a.name); })).slice(100);
    for (let x of filteredReviews) {
        let hourlySalary = x.salary_in_cents;
        if (x.pay_period === "monthly") {
            hourlySalary = (hourlySalary / 20) / 8;
        }
        else if (x.pay_period === "weekly") {
            hourlySalary = (hourlySalary / 5) / 8;
        }
        let hourlyCADSalary = hourlySalary;
        if (!x.currency) {
            continue;
        }
        hourlyCADSalary *= currencyConversions[x.currency];
        hourlyCADSalary = Math.floor(hourlyCADSalary / 100);
        const job = Object.values(jobs).find(job => job.id === x.job_id);
        const title = (_a = job === null || job === void 0 ? void 0 : job.title) !== null && _a !== void 0 ? _a : "";
        let location = (_b = job === null || job === void 0 ? void 0 : job.location) !== null && _b !== void 0 ? _b : "";
        if (location) {
            const splitLocation = location.split(", ");
            const firstTokens = [...splitLocation];
            firstTokens.pop();
            if (splitLocation.length > 2) {
                location = `${firstTokens.join(" ")}, ${splitLocation.pop()}`;
            }
        }
        const company = Object.values(companies).find(company => company.id === x.company_id);
        let companyDocument = yield CompanyDomains_1.default.findOne({ companyName: company.name }); //Already filtered for company object
        if (!companyDocument) {
            companyDocument = new CompanyDomains_1.default({
                companyName: company.name,
                logo: (company === null || company === void 0 ? void 0 : company.logo_url) ? company.logo_url : undefined,
                description: (company === null || company === void 0 ? void 0 : company.description) ? company.description : undefined,
            });
            yield companyDocument.save();
            newCompanyIDs.add(companyDocument.id);
        }
        else {
            if (!(companyDocument.id in newCompanyIDs)) {
                existingCompanyIDs.add(companyDocument.id);
            }
        }
        ExternalReviewPost.push({
            role: DEFAULT_ROLE_ID,
            company: companyDocument.id,
            user: DEFAULT_USER_ID,
            mentorshipRating: x.mentorship_rating * 20,
            workLifeRating: x.work_life_balance_rating * 20,
            meaningfulRating: x.meaningful_work_rating * 20,
            salary: hourlyCADSalary,
            review: x.description,
            date: new Date(x.created_at).getTime(),
            upvoters: [],
            downvoters: [],
            externalURL: "https://gist.github.com/agnanachandran/b01a1b6c11a26dbbc54ce7d525ad08b9",
            externalName: "InternCompass archived review",
            title,
            location
        });
    }
    console.log(currencies);
    console.log(`${ExternalReviewPost.length} Docs created, inserting into DB`);
    yield JobReview_1.default.insertMany(ExternalReviewPost);
    yield fs_1.default.promises.writeFile("./files/output.txt", `OLD COMPANIES: \n${Array.from(existingCompanyIDs).join("\n")}\n\nNEW COMPANIES:\n${Array.from(newCompanyIDs).join("\n")}`, { flag: 'w' });
    console.log("Done");
});
fire();
