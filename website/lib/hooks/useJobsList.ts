import { useEffect, useState, useMemo } from "react";
import {
  JobsPageRowData,
  getDifferentCountries,
} from "src/lib/jobsList/jobsList";
import { ISearchChip } from "src/components/SearchBar/SearchBarJobsList";
import lunr from "lunr";
import {
  IGetCompaniesDataResponse,
  IJobKeywordObject,
  Requests,
} from "src/lib/requests/Requests";
import { getSearchTypeField, SearchTypes } from "src/lib/search/Search";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { getEarliestDeadline } from "src/lib/dates/dates";
import {
  FilterState,
  FilterStates,
  FormulaNode,
  getFormula,
  isJobMatched,
} from "../filter/jobsFilterEval";
import {
  AppDocFilterTags,
  DurationFilterTags,
  JobFilters,
  SpecialReqFilterTags,
} from "../extension/jobFilters";

export const useJobsList = () => {
  const {
    coopJobsListPageRows: jobs,
    isDataReady,
    coopJobsFilterTags,
  } = useExtensionsDataContext();
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
  const [filterStates, setFilterStates] = useState<FilterStates>({
    [JobFilters.durationFilter]: {
      [DurationFilterTags.fourMonth]: FilterState.none,
      [DurationFilterTags.eightMonthPref]: FilterState.none,
      [DurationFilterTags.eightMonthReq]: FilterState.none,
    },
    [JobFilters.appDocFilter]: {
      [AppDocFilterTags.coverLetter]: FilterState.none,
      [AppDocFilterTags.other]: FilterState.none,
    },
    [JobFilters.specialReqFilter]: {
      [SpecialReqFilterTags.swpp]: FilterState.none,
      [SpecialReqFilterTags.fullyVaccinated]: FilterState.none,
      [SpecialReqFilterTags.usaWorkEligibility]: FilterState.none,
      [SpecialReqFilterTags.remoteFromCanada]: FilterState.none,
      [SpecialReqFilterTags.securityClearance]: FilterState.none,
      [SpecialReqFilterTags.driversLicense]: FilterState.none,
      [SpecialReqFilterTags.externalApplication]: FilterState.none,
    },
  });
  const [filterFormula, setFilterFormula] = useState<FormulaNode>();
  const [numActiveChips, setNumActiveChips] = useState<number>(0);
  const { isLoading: isJobTagsLoading } = useJobTagsContext();
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
      if (!uniqueCompanyNames.length || !jobs.length) {
        return;
      }
      const out = await Requests.getCompaniesData(uniqueCompanyNames);
      setCompaniesData(out);
      const newJobsList: {
        [jobID: string]: JobsPageRowData;
      } = {};

      jobs.forEach(job => {
        const companyData = out.companyToData[job.companyName];
        newJobsList[job.id] = {
          ...job,
          ratingsScore: companyData?.ratingAverage ?? null,
          salaryScore: companyData?.salaryScore ?? null,
          interviewScore: companyData?.interviewAverage ?? null,
        };
      });
      setJobsList(newJobsList);
    };
    fire();
  }, [jobs, uniqueCompanyNames]);

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

  useEffect(() => {
    if (uniqueCompanyNames.length > 0) {
      Requests.postNewCompanies(uniqueCompanyNames);
    }
  }, [uniqueCompanyNames]);

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

  // Build Filter Formula
  useEffect(() => {
    setFilterFormula(getFormula(filterStates));
  }, [filterStates]);

  // Filter out jobs based on search and filtering
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
    if (filterFormula !== undefined) {
      newJobs = newJobs.filter(job =>
        isJobMatched(filterFormula, coopJobsFilterTags[job.id])
      );
    }

    setDisplayJobs(newJobs);
  }, [jobsList, searchIndex, searchChips, numActiveChips, filterFormula]);

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
    logos: companiesData,
    filterStates,
    setFilterStates,
  };
};
