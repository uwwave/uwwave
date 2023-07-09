import { connectToDb } from "../database/connect";
import * as reviews from "../../files/user_review.json"
import * as companies from "../../files/company.json"
import * as jobs from "../../files/job.json"
import JobReviewDocument, { IExternalReviewPost} from "../database/models/JobReview";
import CompanyDocument from "../database/models/CompanyDomains"
import fs from 'fs';

const DEFAULT_ROLE_ID = "649512cefa64fb130f275a86"
const DEFAULT_USER_ID = "64aa216db0c9c54d34120ed6"
const currencyConversions:{[key: string]: number} = {
    'USD':1.33,
    'CAD':1,
    'EUR':1.46,
    'JPY':0.0094,
    'GBP':1.71,
    'HKD':0.17,
    'SGD':0.98,
    'INR':0.016,
    'NOK':0.13
}
const currencies = new Set<string>()
const fire = async () => {
    await connectToDb();
    console.log("Generating documents from user_review.json")
    const existingCompanyIDs = new Set<string>()
    const newCompanyIDs = new Set<string>()
    const ExternalReviewPost:IExternalReviewPost[] = []
    const filteredReviews = Object.values(reviews)
    .filter(x=>Object.values(companies).find(company=>company.id === x.company_id && Object.values(companies).find(company=>company.id === x.company_id)?.name)).slice(100)
    for(let x of filteredReviews){
        let hourlySalary = x.salary_in_cents
        if(x.pay_period === "monthly"){
            hourlySalary = (hourlySalary / 20) / 8
        }else if(x.pay_period === "weekly"){
            hourlySalary = (hourlySalary / 5) / 8
        }
        let hourlyCADSalary = hourlySalary
        if(!x.currency){
            continue
        }
        hourlyCADSalary *= currencyConversions[x.currency]
        hourlyCADSalary = Math.floor(hourlyCADSalary / 100)
        const job = Object.values(jobs).find(job=>job.id === x.job_id)
        const title = job?.title ?? ""
        let location = job?.location ?? ""
        if(location){
            const splitLocation = location.split(", ")
            const firstTokens = [...splitLocation]
            firstTokens.pop()
            if(splitLocation.length > 2){
                location = `${firstTokens.join(" ")}, ${splitLocation.pop()}`
            }
        }

        const company = Object.values(companies).find(company=>company.id === x.company_id)
        let companyDocument = await CompanyDocument.findOne({companyName: company!.name }) //Already filtered for company object
        if(!companyDocument){
            companyDocument = new CompanyDocument({
                companyName: company!.name,
                logo: company?.logo_url ? company.logo_url : undefined,
                description: company?.description ? company.description : undefined,
            })
            await companyDocument.save();
            newCompanyIDs.add(companyDocument.id)
        }else{
            if(!(companyDocument.id in newCompanyIDs)){
                existingCompanyIDs.add(companyDocument.id)
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
        })
    }
    console.log(currencies)
    console.log(`${ExternalReviewPost.length} Docs created, inserting into DB`)
    await JobReviewDocument.insertMany(ExternalReviewPost)
    await fs.promises.writeFile("./files/output.txt", `OLD COMPANIES: \n${Array.from(existingCompanyIDs).join("\n")}\n\nNEW COMPANIES:\n${Array.from(newCompanyIDs).join("\n")}`, { flag: 'w' });
    console.log("Done")
}

fire()