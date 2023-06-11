import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import moment from "moment/moment";
import Container from "@mui/material/Container";
import { JobBoard } from "src/lib/extension/shared/jobBoard";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import {
  DAYS_TO_STALE_DATA,
  LocalStorageMetadataKeys,
} from "src/lib/extension/shared/userProfile";
import { BackgroundColor } from "src/styles/color";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { useExtensionData } from "src/lib/extension/hooks/useExtensionData";
import { WarningIcon } from "src/components/icons/WarningIcon";
import { CheckIcon } from "src/components/icons/CheckIcon";
import {
  IGetCompanyLogosResponse,
  IJobKeywordObject,
  Requests,
} from "src/lib/requests/Requests";
import {
  SearchBarJobsList,
  ISearchChip,
} from "components/SearchBar/SearchBarJobsList";
import lunr from "lunr";
import { getSearchTypeField, SearchTypes } from "src/lib/search/Search";
import { JobsDataGrid } from "src/components/JobsDataGrid/JobsDataGrid";
import { Footer } from "src/components/Footer/Footer";

export interface JobsPageProps {
  jobs: JobsPageRowData[];
  jobBoard: JobBoard;
  loading: boolean;
  dateScraped: string;
}

function getTimeDiffString(timeOld: string) {
  const timeDiffSeconds = moment().utc().diff(timeOld, "second");
  let timeDiffString;
  if (timeDiffSeconds === 1) {
    // 1 s
    timeDiffString = "1 second ago ";
  } else if (timeDiffSeconds < 60) {
    // < 1 min in seconds
    timeDiffString = `${moment().utc().diff(timeOld, "second")} seconds ago `;
  } else if (timeDiffSeconds < 119) {
    // 1 min
    timeDiffString = "1 minute ago ";
  } else if (timeDiffSeconds < 3600) {
    // < 1 hr in minutes
    timeDiffString = `${moment().utc().diff(timeOld, "minute")} minutes ago `;
  } else if (timeDiffSeconds < 7199) {
    // 1 hr
    timeDiffString = "1 hour ago ";
  } else if (timeDiffSeconds < 86400) {
    // < 1 day in hours
    timeDiffString = `${moment().utc().diff(timeOld, "hour")} hours ago `;
  } else if (timeDiffSeconds < 172799) {
    // 1 day
    timeDiffString = "1 day ago ";
  } else {
    // >= 2 days
    timeDiffString = `${moment().utc().diff(timeOld, "day")} days ago `;
  }
  return timeDiffString;
}
export default function JobsListPage() {
  useEffect(() => {
    document.title = "Wave - Jobs List";
  }, []);

  const [dataAgeMessage, setDataAgeMessage] = useState("");
  const [isStale, setIsStale] = useState(false);
  const [jobKeywords, setJobKeywords] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [logos, setLogos] = useState<IGetCompanyLogosResponse | undefined>();
  const {
    coopJobsListPageRows: jobs,
    extensionData,
    isDataReady,
  } = useExtensionData();
  const dateScraped = extensionData[LocalStorageMetadataKeys.SCRAPE_AT];
  const loading = !isDataReady || logos === undefined;

  const [jobsList, setJobsList] = useState<any>({});
  const [displayJobs, setDisplayJobs] = useState<JobsPageRowData[]>(jobs);
  const [searchChips, setSearchChips] = useState<ISearchChip[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [searchIndex, setSearchIndex] = useState(lunr(() => {}));

  useEffect(() => {
    // get last scraped time
    setIsStale(
      moment().utc().subtract(DAYS_TO_STALE_DATA, "day").isAfter(dateScraped)
    );
    setDataAgeMessage(
      dateScraped ? `Last scraped: ${getTimeDiffString(dateScraped)}` : ""
    );

    if (jobs.length === 0) {
      return;
    }
    // get keywords for jobs
    Requests.getJobKeywords(jobs.map(item => item.id as any as string))
      .then((res: IJobKeywordObject) => {
        setJobKeywords(res.jobs);
      })
      .catch((err: any) => err);
  }, [jobs, dateScraped]);

  useEffect(() => {
    const newJobsList: any = {};

    jobs.forEach(job => {
      newJobsList[job.id] = {
        ...job,
      };
    });
    setJobsList(newJobsList);
  }, [jobs]);

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

  useEffect(() => {
    let queryString = "";
    searchChips.forEach(chip => {
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
    });

    let newJobs: JobsPageRowData[] = Object.values(jobsList);
    if (queryString !== "") {
      const searchRankings = searchIndex.search(queryString);
      newJobs = searchRankings.map((searchResult: any) => {
        return jobsList[searchResult.ref];
      });
    }

    setDisplayJobs(newJobs);
  }, [jobsList, searchIndex, searchChips]);

  useEffect(() => {
    const fire = async () => {
      const out = await Requests.getCompanyLogos();
      setLogos(out);
    };
    fire();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container>
        <MainWrapper>
          <Spacer height={64} />
          <Typography fontWeight="bold" sx={{ fontSize: "24px" }}>
            Jobs List
          </Typography>
          <Spacer height={16} />
          <Typography>{jobs.length} Listings</Typography>
          <Spacer height={16} />
          {!!dataAgeMessage && (
            <Typography>
              {dataAgeMessage}
              {isStale ? <WarningIcon width={16} /> : <CheckIcon width={16} />}
            </Typography>
          )}
          <Spacer height={32} />
        </MainWrapper>
      </Container>
      <WaterWrapper>
        <Spacer height={32} />
        <Container>
          <SearchBarJobsList onSearchUpdated={setSearchChips} />
          <Spacer height={16} />
          <JobsDataGrid
            jobs={displayJobs}
            loading={loading}
            jobKeywords={jobKeywords}
            companyLogos={logos}
          />
        </Container>
        <Spacer height={64} />
      </WaterWrapper>
      <Footer dark />
    </>
  );
}

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${BackgroundColor.dark};
  min-height: 100vh;
`;
