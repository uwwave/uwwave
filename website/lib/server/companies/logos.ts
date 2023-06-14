import connectToDb from "src/database/mongo-db";
import { IGetCompanyLogosResponse } from "src/lib/requests/Requests";
import CompanyDomainsDoc from "src/database/models/CompanyDomains";

export const getCompanyLogos = async (): Promise<IGetCompanyLogosResponse> => {
  await connectToDb();
  const companies = await CompanyDomainsDoc.find();
  const out: { [key: string]: string | undefined } = {};
  companies.forEach(company => {
    out[company.companyName] = company.logo;
  });
  const respOut: IGetCompanyLogosResponse = {
    companyNameToLogo: out,
  };
  return respOut;
};
