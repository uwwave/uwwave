import { useEffect, useMemo, useState } from "react";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { IGetCompaniesDataResponse, Requests } from "src/lib/requests/Requests";

export const useCompanyJobsDataGrid = (
  companyName: string,
  companyLogo: string
) => {
  const { coopJobsListPageRows: jobs, isLoading: isExtensionLoading } =
    useExtensionsDataContext();
  const [jobKeywords, setJobKeywords] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [companiesData, setCompaniesData] =
    useState<IGetCompaniesDataResponse>();

  const [isKeywordsLoading, setIsKeywordsLoading] = useState(true);

  const displayJobs = useMemo(() => {
    if (!companiesData) {
      return [];
    }
    const companyData = companiesData.companyToData[companyName];
    return jobs
      .filter(x => x.companyName === companyName)
      .map(x => ({
        ...x,
        salaryScore: companyData.salaryScore ?? null,
        interviewScore: companyData.interviewAverage ?? null,
        ratingsScore: companyData.ratingAverage ?? null,
      }));
  }, [jobs, companyName, companiesData]);

  useEffect(() => {
    //We only fetch initially, since you can't add more jobs directly from the tagged jobs page
    const fire = async () => {
      if (!displayJobs || !isKeywordsLoading) {
        return;
      }
      const out = await Requests.getJobKeywords(
        displayJobs.map(x => x.id.toString())
      );
      const companiesData = await Requests.getCompaniesData([companyName]);
      setCompaniesData(companiesData);
      setJobKeywords(out.jobs);
      setIsKeywordsLoading(false);
    };

    fire();
  }, [displayJobs]);

  const logos: IGetCompaniesDataResponse = {
    companyToData: {
      [companyName]: {
        logo: companyLogo,
      },
    },
  };

  const isLoading = isExtensionLoading || isKeywordsLoading;
  return {
    isLoading,
    displayJobs,
    logos,
    jobKeywords,
  };
};
