import { useEffect, useState } from "react";
import { JobsPageRowData } from "../jobsList/jobsList";
import { useExtensionData } from "../extension/hooks/useExtensionData";
import { ISearchChip } from "src/components/SearchBar/SearchBarJobsList";
import {
  DAYS_TO_STALE_DATA,
  LocalStorageMetadataKeys,
} from "src/lib/extension/shared/userProfile";
import lunr from "lunr";
import moment from "moment/moment";
import { getTimeDiffString } from "src/lib/dates/dates";
import {
  IGetCompanyLogosResponse,
  IJobKeywordObject,
  Requests,
} from "src/lib/requests/Requests";
import { getSearchTypeField, SearchTypes } from "src/lib/search/Search";

export const useJobsList = () => {
  const {
    coopJobsListPageRows: jobs,
    extensionData,
    isDataReady,
  } = useExtensionData();

  // Time states
  const [dataAgeMessage, setDataAgeMessage] = useState("");
  const [isStale, setIsStale] = useState(false);

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

  const [logos, setLogos] = useState<IGetCompanyLogosResponse | undefined>();

  const dateScraped = extensionData[LocalStorageMetadataKeys.SCRAPE_AT];

  useEffect(() => {
    const fire = async () => {
      const out = await Requests.getCompanyLogos();
      setLogos(out);
    };
    fire();
  }, []);

  // Determine staleness
  useEffect(() => {
    // Get last scraped time
    setIsStale(
      moment().utc().subtract(DAYS_TO_STALE_DATA, "day").isAfter(dateScraped)
    );
    setDataAgeMessage(
      dateScraped ? `Last scraped: ${getTimeDiffString(dateScraped)}` : ""
    );
  }, [dateScraped]);

  // Build Keywords
  useEffect(() => {
    if (jobs.length === 0) {
      return;
    }
    // get keywords for jobs
    Requests.getJobKeywords(jobs.map(item => item.id as any as string))
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

  const isLoading = !isDataReady;

  return {
    displayJobs,
    isLoading,
    dataAgeMessage,
    isStale,
    jobKeywords,
    numJobs: jobs.length,
    logos,
    setChips: setSearchChips,
    setNumActiveChips,
    numActiveChips,
  };
};
