import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import { doCompanyNamesMatch } from "src/lib/companyDomainSearch/companyDomainSearch";
import CompanyDomainsDoc, {
  ICompanyClearbitData,
} from "src/database/models/CompanyDomains";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const clearbit = require("clearbit")(process.env.CLEARBIT);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
      case "POST":
        await handlePost(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(403).end(String(err));
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyName, domain } = req.body;
  const companyNameString = companyName as string;
  const domainString = domain as string;
  const Company = clearbit.Company;

  return new Promise((_, reject) => {
    Company.find({ domain: domainString })
      .then(async function (company: ICompanyClearbitData) {
        if (!doCompanyNamesMatch(companyNameString, company.name)) {
          reject(new Error("Company name does not match name from URL"));
          return;
        }
        await connectToDb();
        await CompanyDomainsDoc.findOneAndUpdate(
          { companyName: companyNameString },
          { ...company },
          { new: true, upsert: true }
        );
        res.send(company);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyName, id } = req.query;
  if (!companyName && !id) {
    throw "No company Name or id Provided";
  }
  console.log(companyName);
  await connectToDb();
  const companyDomain = companyName
    ? await CompanyDomainsDoc.findOne({
        companyName: companyName,
      })
    : await CompanyDomainsDoc.findById(id);
  if (!companyDomain) {
    throw "Can't find company";
  }
  res.send(companyDomain.toObject());
};
