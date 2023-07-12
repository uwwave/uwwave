//TODO: Make sure you updated the correct consts for roleID and userID when switching from staging to prod
//DESCRIPTION: 
/*
This scripts updates the reddit megathread job reviews that only supply salaries. 
There should only one description per company since the megathread is a spreadsheet that is maintained over the years
I used chatgbt to scrape the spreadsheet to get initial values, some aren't acurate and are discarded
*/


import { connectToDb } from "../database/connect";
import * as salaries from "../../files/spring2023MegathreadSalaries.json"
import JobReviewDocument, { IExternalReviewPost} from "../database/models/JobReview";
import CompanyDocument from "../database/models/CompanyDomains"
import fs from 'fs';
import { DEFAULT_ROLE_ID, DEFAULT_USER_ID } from "../lib/consts";

interface IPreData{
    companyName: string,
    minSalary: number,
    maxSalary: number
    coopNumber: number,
}

interface IPreDataMap {
    [key: string]: IPreData
}

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
const MEGATHREAD_POST_NAME = `WaterlooWorks Megathread`

const fire = async () => {
    const existingCompanyIDs = new Set<string>()
    const newCompanyIDs = new Set<string>()
    let preData: IPreDataMap = {}
    //preData
    for(let salary of Object.values(salaries)){
        if(
            salary.coopNumber === null || 
            !salary.companyName ||
            typeof salary.coopNumber === "string" ||
            (salary.companyName.includes("(") && salary.companyName.includes(")") ) ||
            !salary.salary ||
            salary.salary >= 100 || 
            salary.coopNumber > 7
        ){
            continue
        }

        if(salary.companyName in preData){
            preData[salary.companyName].minSalary = Math.min(preData[salary.companyName].minSalary, salary.salary)
            preData[salary.companyName].maxSalary = Math.max(preData[salary.companyName].maxSalary, salary.salary)
            continue
        }
        preData[salary.companyName] = {
            minSalary: salary.salary,
            maxSalary: salary.salary,
            companyName: salary.companyName,
            coopNumber: salary.coopNumber
        }
    }
    await connectToDb();
    console.log("Generating documents from spring2023MegathreadSalaries.json")
    const externalReviewPosts:IExternalReviewPost[] = []
    for(let x of Object.values(preData)){
        let companyDocument = await CompanyDocument.findOne({companyName: x.companyName })
        if(!companyDocument){
            companyDocument = new CompanyDocument({
                companyName: x.companyName,
            })
            await companyDocument.save();
            newCompanyIDs.add(companyDocument.id)
        }else{
            if(!(companyDocument.id in newCompanyIDs)){
                existingCompanyIDs.add(companyDocument.id)
            } 
        }
        externalReviewPosts.push({
            role: DEFAULT_ROLE_ID,
            company: companyDocument.id,
            user: DEFAULT_USER_ID,
            salary: Math.floor((x.maxSalary + x.minSalary)/2 ),
            minSalary: x.minSalary,
            maxSalary: x.maxSalary,
            date: new Date().getTime(),
            upvoters: [],
            downvoters: [],
            externalURL: "https://docs.google.com/spreadsheets/d/1kMBu1_TONgzZ0Ysz3d2OYiu1O8kDftZxT3INxrz8hII",
            externalName: MEGATHREAD_POST_NAME,
        })
    }
    console.log("Done")
    console.log("Creating new & updating megathread review docs")
    //Update / Create new reviews
    for(let x of externalReviewPosts){
        const existing = await JobReviewDocument.findOne({company: x.company, externalName: MEGATHREAD_POST_NAME})
        if(!existing){
            const newDoc = new JobReviewDocument({...x})
            await newDoc.save()
            continue
        }
        existing.set({...x})
        await existing.save()
    }
    await fs.promises.writeFile("./files/output.txt", `OLD COMPANIES: \n${Array.from(existingCompanyIDs).join("\n")}\n\nNEW COMPANIES:\n${Array.from(newCompanyIDs).join("\n")}`, { flag: 'w' });
    console.log("Done")
}

//fire()

const temp = async () => {
    await connectToDb();
    console.log("Updating megathread documents to new name")
    const filter = { externalName: "WaterlooWorks Spring 2023 Megathread" };
    const update = { externalName: MEGATHREAD_POST_NAME };
    const options = { multi: true }; 
    await JobReviewDocument.updateMany(filter, update, options);
    console.log("Done")
}

fire()
