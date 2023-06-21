import { useEffect, useMemo, useState } from "react";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { IGetCompanyLogosResponse, Requests } from "src/lib/requests/Requests";

export const useCompanyJobsDataGrid = (
  companyName: string,
  companyLogo: string
) => {
  const { coopJobsListPageRows: jobs, isLoading: isExtensionLoading } =
    useExtensionsDataContext();
  const [jobKeywords, setJobKeywords] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(true);

  const displayJobs = useMemo(() => {
    return jobs.filter(x => x.companyName === companyName);
  }, [jobs, companyName]);

  useEffect(() => {
    //We only fetch initially, since you can't add more jobs directly from the tagged jobs page
    const fire = async () => {
      if (!displayJobs) {
        return;
      }
      const out = await Requests.getJobKeywords(
        displayJobs.map(x => x.id.toString())
      );
      setJobKeywords(out.jobs);
      setIsKeywordsLoading(false);
    };

    fire();
  }, [displayJobs]);

  const logos: IGetCompanyLogosResponse = {
    companyNameToLogo: {
      [companyName]: companyLogo,
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
