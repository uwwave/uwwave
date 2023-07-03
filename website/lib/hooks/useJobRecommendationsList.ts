import { useEffect, useState, useMemo } from "react";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { IGetCompaniesDataResponse, Requests } from "src/lib/requests/Requests";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";

export const useJobRecommendationsList = (jobID: string) => {
  const { coopJobsListPageRows: jobs, isDataReady } =
    useExtensionsDataContext();
  const [displayJobs, setDisplayJobs] = useState<JobsPageRowData[]>(jobs);
  const [recommendedJobIDs, setRecommendedJobIds] = useState<string[]>([]);
  const { isLoading: isJobTagsLoading } = useJobTagsContext();
  const [companiesData, setCompaniesData] =
    useState<IGetCompaniesDataResponse>();

  const recommendedJobs: JobsPageRowData[] = useMemo(() => {
    if (!jobs.length || !recommendedJobIDs.length) {
      return [];
    }
    return jobs.filter(x => recommendedJobIDs.includes(x.id.toString()));
  }, [jobs, recommendedJobIDs]);

  const uniqueCompanyNames: string[] = useMemo(() => {
    const set = new Set<string>();
    recommendedJobs.forEach(job => {
      set.add(job.companyName);
    });
    return Array.from(set);
  }, [recommendedJobs]);

  useEffect(() => {
    const fire = async () => {
      if (!jobID) {
        return;
      }
      setRecommendedJobIds(await Requests.getJobRecommendations(jobID));
    };
    fire();
  }, [jobID]);

  useEffect(() => {
    const fire = async () => {
      if (!uniqueCompanyNames.length || !recommendedJobs.length) {
        return;
      }
      const out = await Requests.getCompaniesData(uniqueCompanyNames);
      setCompaniesData(out);
      setDisplayJobs(
        recommendedJobs.map(x => {
          const companyData = out.companyToData[x.companyName];
          return {
            ...x,
            ratingsScore: companyData?.ratingAverage ?? null,
            salaryScore: companyData?.salaryScore ?? null,
            interviewScore: companyData?.interviewAverage ?? null,
          };
        })
      );
    };
    fire();
  }, [recommendedJobs, uniqueCompanyNames]);

  const isLoading = !isDataReady || isJobTagsLoading || !displayJobs.length;

  return {
    displayJobs,
    isLoading,
    logos: companiesData,
  };
};
