import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import CompanyDomainsDoc from "src/database/models/CompanyDomains";
import { IGetCompanyLogosResponse } from "src/lib/requests/Requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(403).end(String(err));
  }
};

export default handler;

const handleGet = (res: NextApiResponse) => {
  return new Promise((_, reject) => {
    connectToDb()
      .then(async () => {
        const companies = await CompanyDomainsDoc.find();
        const out: { [key: string]: string | undefined } = {};
        companies.forEach(company => {
          out[company.companyName] = company.logo;
        });
        const respOut: IGetCompanyLogosResponse = {
          companyNameToLogo: out,
        };
        res.send(respOut);
      })
      .catch(error => {
        reject(error); // Reject the promise if an error occurs
      });
  });
};
