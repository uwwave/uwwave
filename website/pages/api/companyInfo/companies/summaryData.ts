import type { NextApiRequest, NextApiResponse } from "next";
import {
  ICompanyData,
  IGetCompaniesDataResponse,
} from "src/lib/requests/Requests";
import { getCompanyLogos, getMetrics } from "src/lib/server/companies/data";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        handlePost(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(403).end(String(err));
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyNames } = req.body;
  if (!companyNames) {
    throw "No company names provided";
  }
  const logos = (await getCompanyLogos(companyNames)).companyToData;
  const { reviewMetricsMap, interviewMetricsMap } = await getMetrics();
  const companyToData: { [key: string]: ICompanyData } = {};
  Object.keys(logos).forEach(companyName => {
    const current: ICompanyData = {};
    if (companyName in reviewMetricsMap) {
      current.ratingAverage = reviewMetricsMap[companyName].ratingAverage;
      current.salaryScore = reviewMetricsMap[companyName].salaryScore;
    }
    if (companyName in interviewMetricsMap) {
      current.interviewAverage =
        interviewMetricsMap[companyName].interviewAverage;
    }
    if (companyName in logos) {
      current.logo = logos[companyName].logo;
    }
    companyToData[companyName] = current;
  });
  const out: IGetCompaniesDataResponse = { companyToData };
  res.send(out);
};

export default handler;
