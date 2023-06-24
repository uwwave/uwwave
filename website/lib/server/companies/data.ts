import connectToDb from "src/database/mongo-db";
import {
  ICompanyData,
  ICompanyInterviewReviewData,
  ICompanyJobReviewData,
  IGetCompaniesDataResponse,
} from "src/lib/requests/Requests";
import CompanyDomainsDoc from "src/database/models/CompanyDomains";
import JobReviewDoc from "src/database/models/JobReview";
import InterviewReviewDoc from "src/database/models/InterviewReview";
import { calculatePercentile } from "src/lib/stats/reviewSummary";

export const getCompanyLogos = async (
  companyNames: string[]
): Promise<IGetCompaniesDataResponse> => {
  await connectToDb();

  const companies = await CompanyDomainsDoc.find({
    companyName: { $in: companyNames },
  });

  const companyToData: { [key: string]: ICompanyData } = companies.reduce(
    (acc: any, company) => {
      acc[company.companyName] = { logo: company.logo };
      return acc;
    },
    {}
  );

  return { companyToData };
};

interface IMetrics {
  reviewMetricsMap: ICompanyJobReviewData;
  interviewMetricsMap: ICompanyInterviewReviewData;
}
export const getMetrics = async (): Promise<IMetrics> => {
  const reviewMetrics = await JobReviewDoc.aggregate([
    {
      $lookup: {
        from: "companydomains",
        localField: "company",
        foreignField: "_id",
        as: "companyDetails",
      },
    },
    {
      $unwind: "$companyDetails",
    },
    {
      $group: {
        _id: "$companyDetails",
        ratingAverage: { $avg: "$rating" },
        salaries: { $push: "$salary" },
      },
    },
    {
      $project: {
        _id: 1,
        companyName: "$_id.companyName",
        ratingAverage: { $round: ["$ratingAverage", 2] },
        salaries: 1,
      },
    },
  ]);
  const interviewMetrics = await InterviewReviewDoc.aggregate([
    {
      $lookup: {
        from: "companydomains",
        localField: "company",
        foreignField: "_id",
        as: "companyDetails",
      },
    },
    {
      $unwind: "$companyDetails",
    },
    {
      $group: {
        _id: "$companyDetails",
        interviewAverage: { $avg: "$difficulty" },
      },
    },
    {
      $project: {
        _id: 0,
        companyName: "$_id.companyName",
        interviewAverage: { $round: ["$interviewAverage", 2] },
      },
    },
  ]);

  const interviewMetricsMap: ICompanyInterviewReviewData =
    interviewMetrics.reduce((map, metric) => {
      const { companyName, ...rest } = metric;
      map[companyName] = rest;
      return map;
    }, {});

  const allSalaries = reviewMetrics
    .map(metric => metric.salaries)
    .flat()
    .filter(salary => typeof salary === "number");

  const reviewMetricsMap: ICompanyJobReviewData = reviewMetrics.reduce(
    (map, metric) => {
      const { companyName, ratingAverage } = metric;
      const companySalaries = metric.salaries.filter(
        (salary: any) => typeof salary === "number"
      );
      const salaryScore = calculatePercentile(companySalaries, allSalaries);
      map[companyName] = {
        salaryScore,
        ratingAverage,
      };
      return map;
    },
    {}
  );

  return {
    reviewMetricsMap,
    interviewMetricsMap,
  };
};
