import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import { doCompanyNamesMatch } from "src/lib/companyDomainSearch/companyDomainSearch";
import CompanyDomainsDoc, {
  ICompanyClearbitData,
} from "src/database/models/CompanyDomains";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
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
  } catch (err: any) {
    if (err.body.error.message) {
      res.status(403).end(err.body.error.message);
    } else {
      res.status(403).end(err);
    }
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (!session || !session.user) {
    throw "Must be signed in";
  }
  const { companyName, domain } = req.body;
  const companyNameString = companyName as string;
  const domainString = domain as string;
  if (!companyNameString && !domainString) {
    throw "Must atleast supply domain string";
  }
  const Company = clearbit.Company;
  await connectToDb();
  if (!companyNameString) {
    //uploading non existing company
    //check if domain exists
    const existingDomain = await CompanyDomainsDoc.findOne({ domain: domain });
    if (existingDomain) {
      res.send(existingDomain.toObject());
      return;
    }

    return new Promise((_, reject) => {
      Company.find({ domain: domainString })
        .then(async function (company: ICompanyClearbitData) {
          const newCompany = new CompanyDomainsDoc({
            ...company,
            companyName: company.name,
          });
          await newCompany.save();
          res.send(newCompany.toObject());
          return;
        })
        .catch((x: any) => {
          reject(x);
        });
    });
  }

  return new Promise((_, reject) => {
    //update existing company
    Company.find({ domain: domainString })
      .then(async function (company: ICompanyClearbitData) {
        if (!doCompanyNamesMatch(companyNameString, company.name)) {
          throw "Company name does not match name from URL";
        }
        const out = await CompanyDomainsDoc.findOneAndUpdate(
          { companyName: companyNameString },
          { ...company },
          { new: true, upsert: true }
        );
        res.send(out.toObject());
      })
      .catch((x: any) => {
        reject(x);
      });
  });
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyName, id } = req.query;
  if (!companyName && !id) {
    throw "No company Name or id Provided";
  }
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
