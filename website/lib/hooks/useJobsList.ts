import { useEffect, useState, useMemo } from "react";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { ISearchChip } from "src/components/SearchBar/SearchBarJobsList";
import {
  DAYS_TO_STALE_DATA,
  LocalStorageMetadataKeys,
} from "src/lib/extension/shared/userProfile";
import lunr from "lunr";
import moment from "moment/moment";
import { getTimeDiffString } from "src/lib/dates/dates";
import { IJobKeywordObject, Requests } from "src/lib/requests/Requests";
import { getSearchTypeField, SearchTypes } from "src/lib/search/Search";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";

export const useJobsList = () => {
  const {
    coopJobsListPageRows: jobs,
    extensionData,
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
  const dateScraped = extensionData[LocalStorageMetadataKeys.SCRAPE_AT];
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

  const dataAgeMessage = useMemo(() => {
    return getTimeDiffString(dateScraped);
  }, [dateScraped]);

  const isStale = useMemo(() => {
    return moment()
      .utc()
      .subtract(DAYS_TO_STALE_DATA, "day")
      .isAfter(dateScraped);
  }, [dateScraped]);

  const earliestDeadline = useMemo(() => {
    const jobIDs = Object.keys(jobsList);
    if (jobIDs.length === 0) {
      return "";
    }
    let out = jobsList[jobIDs[0]].appDeadline;
    jobIDs.forEach(jobID => {
      const deadline = jobsList[jobID].appDeadline;
      if (new Date(out).getTime() > new Date(deadline).getTime()) {
        out = deadline;
      }
    });
    return out;
  }, [jobsList]);

  const differentCountries: { [country: string]: number } = useMemo(() => {
    const out: { [country: string]: number } = {};
    const jobIDs = Object.keys(jobsList);
    jobIDs.forEach(jobID => {
      const country = jobsList[jobID].country;
      if (!country) {
        return;
      }
      if (out[country]) {
        out[country]++;
      } else {
        out[country] = 1;
      }
    });
    return out;
  }, [jobsList]);
  const isLoading =
    !isDataReady ||
    isJobTagsLoading ||
    Object.keys(differentCountries).length === 0;
  return {
    differentCountries,
    earliestDeadline,
    displayJobs,
    isLoading,
    dataAgeMessage,
    isStale,
    jobKeywords,
    numJobs: jobs.length,
    setChips: setSearchChips,
    setNumActiveChips,
    numActiveChips,
  };
};
