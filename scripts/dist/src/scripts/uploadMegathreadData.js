"use strict";
//TODO: Make sure you updated the correct consts for roleID and userID when switching from staging to prod
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
const salaries = __importStar(require("../../files/spring2023MegathreadSalaries.json"));
const JobReview_1 = __importDefault(require("../database/models/JobReview"));
const CompanyDomains_1 = __importDefault(require("../database/models/CompanyDomains"));
const fs_1 = __importDefault(require("fs"));
const consts_1 = require("../lib/consts");
// PROMPT
/*
I'm going to give you some data related to undergraduate co-op salaries. The first column will be the  the company's name and the second column will include a description of the salary pay. I want you to analyze the text and return a json array with the following typescript interface: ```interface IMegatrheadData{
    companyName: string,
    roleTitle?: string,
    salary: number,
    coopNumber?: number,
}``` A couple things:

1. You should retrieve the companyName from the first column
2. The first column may include the title of the role, this is the value of roleTitle
3. The second column might describe what co-op number / year the user submitted is on. This is the coopNumber property
4. The salary is descriped in the second column. I want you to convert any salary (do not include signing bonuses or stipend) into hourly CAD in dollars. All entries should be converte to hourly CAD in dollars, no exceptions. For example,
if the description is `106k USD annual prorated (~$51/hr USD) + 5k relocation`, you should convert $51/hr USD into the equivalenet in CAD If
the description does not have a currency or time, assume its in CAD hourly (if its reasonable)
5. The second column on the same row may have multiple salaries with description of which coop number they are for each salary. These should be different json objects
but have the same companyName and roleTitle

*/
const MEGATHREAD_POST_NAME = `WaterlooWorks Megathread`;
const fire = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingCompanyIDs = new Set();
    const newCompanyIDs = new Set();
    let preData = {};
    //preData
    for (let salary of Object.values(salaries)) {
        if (salary.coopNumber === null ||
            !salary.companyName ||
            typeof salary.coopNumber === "string" ||
            (salary.companyName.includes("(") && salary.companyName.includes(")")) ||
            !salary.salary ||
            salary.salary >= 100 ||
            salary.coopNumber > 7) {
            continue;
        }
        if (salary.companyName in preData) {
            preData[salary.companyName].minSalary = Math.min(preData[salary.companyName].minSalary, salary.salary);
            preData[salary.companyName].maxSalary = Math.max(preData[salary.companyName].maxSalary, salary.salary);
            continue;
        }
        preData[salary.companyName] = {
            minSalary: salary.salary,
            maxSalary: salary.salary,
            companyName: salary.companyName,
            coopNumber: salary.coopNumber
        };
    }
    yield (0, connect_1.connectToDb)();
    console.log("Generating documents from spring2023MegathreadSalaries.json");
    const externalReviewPosts = [];
    for (let x of Object.values(preData)) {
        let companyDocument = yield CompanyDomains_1.default.findOne({ companyName: x.companyName });
        if (!companyDocument) {
            companyDocument = new CompanyDomains_1.default({
                companyName: x.companyName,
            });
            yield companyDocument.save();
            newCompanyIDs.add(companyDocument.id);
        }
        else {
            if (!(companyDocument.id in newCompanyIDs)) {
                existingCompanyIDs.add(companyDocument.id);
            }
        }
        externalReviewPosts.push({
            role: consts_1.DEFAULT_ROLE_ID,
            company: companyDocument.id,
            user: consts_1.DEFAULT_USER_ID,
            salary: Math.floor((x.maxSalary + x.minSalary) / 2),
            minSalary: x.minSalary,
            maxSalary: x.maxSalary,
            date: new Date().getTime(),
            upvoters: [],
            downvoters: [],
            externalURL: "https://docs.google.com/spreadsheets/d/1kMBu1_TONgzZ0Ysz3d2OYiu1O8kDftZxT3INxrz8hII",
            externalName: MEGATHREAD_POST_NAME,
        });
    }
    console.log("Done");
    console.log("Creating new & updating megathread review docs");
    //Update / Create new reviews
    for (let x of externalReviewPosts) {
        const existing = yield JobReview_1.default.findOne({ company: x.company, externalName: MEGATHREAD_POST_NAME });
        if (!existing) {
            const newDoc = new JobReview_1.default(Object.assign({}, x));
            yield newDoc.save();
            continue;
        }
        existing.set(Object.assign({}, x));
        yield existing.save();
    }
    yield fs_1.default.promises.writeFile("./files/output.txt", `OLD COMPANIES: \n${Array.from(existingCompanyIDs).join("\n")}\n\nNEW COMPANIES:\n${Array.from(newCompanyIDs).join("\n")}`, { flag: 'w' });
    console.log("Done");
});
//fire()
const temp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.connectToDb)();
    console.log("Updating megathread documents to new name");
    const filter = { externalName: "WaterlooWorks Spring 2023 Megathread" };
    const update = { externalName: MEGATHREAD_POST_NAME };
    const options = { multi: true };
    yield JobReview_1.default.updateMany(filter, update, options);
    console.log("Done");
});
fire();
