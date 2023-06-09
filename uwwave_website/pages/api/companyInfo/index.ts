import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import { doCompanyNamesMatch } from "src/lib/companyDomainSearch/companyDomainSearch";
import CompanyDomainsDoc from "src/database/models/CompanyDomains";
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
      .then(async function (company: any) {
        if (!doCompanyNamesMatch(companyNameString, company.name)) {
          reject(new Error("Company name does not match name from URL"));
        }
        await connectToDb();
        await CompanyDomainsDoc.findOneAndUpdate(
          { companyName: companyNameString },
          { domain: company.domain },
          { new: true, upsert: true }
        );
        res.send(company);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });
};

const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((_, reject) => {
    const companyName = req.query.companyName;
    if (!companyName) {
      reject();
      return;
    }
    connectToDb()
      .then(async () => {
        // Additional code here...
        const companyDomain = await CompanyDomainsDoc.findOne({
          companyName: companyName,
        });
        if (!companyDomain) {
          reject();
          return;
        }
        const domain = companyDomain.domain;
        const Company = clearbit.Company;
        Company.find({ domain })
          .then(async function (company: any) {
            res.send(company);
          })
          .catch(function (error: any) {
            reject(error);
          });
      })
      .catch(error => {
        reject(error); // Reject the promise if an error occurs
      });
  });
};
