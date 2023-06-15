import { useEffect, useState, useMemo } from "react";
import {
  JobsPageRowData,
  getDifferentCountries,
} from "src/lib/jobsList/jobsList";
import { ISearchChip } from "src/components/SearchBar/SearchBarJobsList";
import lunr from "lunr";
import { IJobKeywordObject, Requests } from "src/lib/requests/Requests";
import { getSearchTypeField, SearchTypes } from "src/lib/search/Search";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { getEarliestDeadline } from "src/lib/dates/dates";

export const useJobsList = () => {
  const {
    coopJobsListPageRows: jobs,
    isDataReady,
    fetchExtensionData,
  } = useExtensionsDataContext();
  useEffect(() => {
    fetchExtensionData();
  }, []);
  // Search and job states
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [searchIndex, setSearchIndex] = useState(lunr(() => {}));
  const [searchChips, setSearchChips] = useState<ISearchChip[]>([]);
  const [jobsList, setJobsList] = useState<{
    [jobID: string]: JobsPageRowData;
  }>({});
  const [displayJobs, setDisplayJobs] = useState<JobsPageRowData[]>(jobs);
  const [jobKeywords, setJobKeywords] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [numActiveChips, setNumActiveChips] = useState<number>(0);
  const { isLoading: isJobTagsLoading } = useJobTagsContext();

  // Build Keywords
  useEffect(() => {
    if (jobs.length === 0) {
      return;
    }
    // get keywords for jobs
    Requests.getJobKeywords(jobs.map(item => item.id.toString()))
      .then((res: IJobKeywordObject) => {
        setJobKeywords(res.jobs);
      })
      .catch((err: any) => err);
  }, [jobs]);

  // Build map of job id to job
  useEffect(() => {
    const newJobsList: any = {};

    jobs.forEach(job => {
      newJobsList[job.id] = {
        ...job,
      };
    });
    setJobsList(newJobsList);
  }, [jobs]);

  // Build Search Index
  useEffect(() => {
    setSearchIndex(
      // eslint-disable-next-line func-names
      // lunr(function (this: lunr) {
      lunr(function (this: any) {
        //TODO: Temp fix for above line
        this.ref("id");
        Object.values(SearchTypes).forEach(type => {
          typeof type === "number" && this.field(getSearchTypeField(type));
        }, this);

        Object.values(jobsList).forEach(job => {
          this.add(job);
        });
      })
    );
  }, [jobsList]);

  // Filter out jobs based on search
  useEffect(() => {
    let queryString = "";
    searchChips.forEach(chip => {
      if (numActiveChips === 0 || chip.isActive === true) {
        const terms = chip.searchVal.split(" ");
        const typeName = getSearchTypeField(chip.searchType);

        terms.forEach(term => {
          if (queryString !== "") {
            queryString += " ";
          }
          queryString += "+";
          if (typeName !== "") {
            queryString += `${typeName}:`;
          }
          queryString += term;
        });
      }
    });

    let newJobs: JobsPageRowData[] = Object.values(jobsList);
    if (queryString !== "") {
      const searchRankings = searchIndex.search(queryString);
      newJobs = searchRankings.map((searchResult: any) => {
        return jobsList[searchResult.ref];
      });
    }

    setDisplayJobs(newJobs);
  }, [jobsList, searchIndex, searchChips, numActiveChips]);

  const earliestDeadline = useMemo(() => {
    return getEarliestDeadline(jobs);
  }, [jobs]);

  const differentCountries: { [country: string]: number } = useMemo(() => {
    return getDifferentCountries(jobs);
  }, [jobs]);

  const isLoading =
    !isDataReady ||
    isJobTagsLoading ||
    Object.keys(differentCountries).length === 0;
  return {
    differentCountries,
    earliestDeadline,
    displayJobs,
    isLoading,
    jobKeywords,
    numJobs: jobs.length,
    setChips: setSearchChips,
    setNumActiveChips,
    numActiveChips,
  };
};
