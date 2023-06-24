import {
  JobsPageRowData,
  getDifferentCountries,
} from "src/lib/jobsList/jobsList";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { useEffect, useMemo, useState } from "react";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { IGetCompaniesDataResponse, Requests } from "src/lib/requests/Requests";
import { getEarliestDeadline } from "src/lib/dates/dates";

export const useTaggedJobsPage = () => {
  const { coopJobsListPageRows: jobs, isDataReady } =
    useExtensionsDataContext();
  const [init, setInit] = useState(false);
  const [jobKeywords, setJobKeywords] = useState<{ [key: string]: string[] }>(
    {}
  );
  const {
    isLoading: isJobTagsLoading,
    tagToJobs,
    tagsInUse,
    tagsNotInUse,
    allTags,
    setEditTag,
    selectedTag,
    setSelectedTag,
    onDeleteTag,
    deleteAllUnusedTags,
    jobToTags,
    totalTaggedJobs,
    tagToJobsCount,
  } = useJobTagsContext();
  const [companiesData, setCompaniesData] =
    useState<IGetCompaniesDataResponse>();
  const uniqueCompanyNames: string[] = useMemo(() => {
    const set = new Set<string>();

    jobs.forEach(job => {
      set.add(job.companyName);
    });
    return Array.from(set);
  }, [jobs]);

  useEffect(() => {
    const fire = async () => {
      if (!uniqueCompanyNames.length || companiesData !== undefined) {
        return;
      }
      const out = await Requests.getCompaniesData(uniqueCompanyNames);
      setCompaniesData(out);
    };
    fire();
  }, [uniqueCompanyNames]);

  const isLoading = isJobTagsLoading || !isDataReady;
  const displayJobs: JobsPageRowData[] = useMemo(() => {
    if (
      !selectedTag ||
      !isDataReady ||
      jobs.length === 0 ||
      !tagToJobs[selectedTag]
    ) {
      return [];
    }
    return jobs
      .filter(job => {
        return tagToJobs[selectedTag].includes(job.id.toString());
      })
      .map(x => ({
        ...x,
        salaryScore:
          companiesData?.companyToData[x.companyName]?.salaryScore ?? null,
        interviewScore:
          companiesData?.companyToData[x.companyName]?.interviewAverage ?? null,
        ratingsScore:
          companiesData?.companyToData[x.companyName]?.ratingAverage ?? null,
      }));
  }, [selectedTag, jobs, isDataReady, tagToJobs, companiesData]);

  const taggedJobRows: JobsPageRowData[] = useMemo(() => {
    const out = jobs.filter(job => {
      return jobToTags[job.id] && jobToTags[job.id].length;
    });
    return out;
  }, [jobs, jobToTags]);

  useEffect(() => {
    if (!selectedTag && tagsInUse.length) {
      setSelectedTag(tagsInUse[0]);
    }
  }, [tagsInUse]);

  useEffect(() => {
    //We only fetch initially, since you can't add more jobs directly from the tagged jobs page
    const fire = async () => {
      const jobIDs = Object.keys(jobToTags);
      if (init || !jobIDs.length) {
        return;
      }
      const out = await Requests.getJobKeywords(jobIDs);
      setJobKeywords(out.jobs);
      setInit(true);
    };

    fire();
  }, [init, jobToTags]);

  const currentTabIndex = tagsInUse.findIndex(x => x === selectedTag);

  const setCurrentTabIndex = (index: number) => {
    setSelectedTag(tagsInUse[index]);
  };

  const earliestDeadline = useMemo(() => {
    return getEarliestDeadline(taggedJobRows);
  }, [taggedJobRows]);

  const differentCountries: { [country: string]: number } = useMemo(() => {
    return getDifferentCountries(taggedJobRows);
  }, [taggedJobRows]);

  return {
    totalTaggedJobs,
    isLoading,
    jobs,
    displayJobs,
    tagsInUse,
    tagsNotInUse,
    currentTabIndex,
    setCurrentTabIndex,
    allTags,
    setEditTag,
    setSelectedTag,
    onDeleteTag,
    deleteAllUnusedTags,
    jobKeywords,
    earliestDeadline,
    differentCountries,
    logos: companiesData,
    tagToJobsCount,
  };
};
