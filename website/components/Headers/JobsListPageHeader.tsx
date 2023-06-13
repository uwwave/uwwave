import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { JobInfoTile } from "src/components/JobInfoTile/JobInfoTile";
import { WarningIcon } from "src/components/icons/WarningIcon";
import { CheckIcon } from "src/components/icons/CheckIcon";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import Tooltip from "@mui/material/Tooltip";
import PublicIcon from "@mui/icons-material/Public";
import Skeleton from "@mui/material/Skeleton";

interface IJobsListPageHeader {
  lastScrapedMessage: string;
  isStale: boolean;
  numJobs: number;
  earliestDeadline: string;
  differentCountries: { [country: string]: number };
  isLoading: boolean;
}
export const JobsListPageHeader = (props: IJobsListPageHeader) => {
  const {
    lastScrapedMessage,
    isStale,
    numJobs,
    earliestDeadline,
    differentCountries,
    isLoading,
  } = props;
  if (isLoading) {
    return (
      <MainWrapper isLoading>
        <Title variant="h3">
          <b>Jobs List</b>
        </Title>
        <Skeleton variant="rounded" width={"12%"} height={64} />
        <Skeleton variant="rounded" width={"12%"} height={64} />
        <Skeleton variant="rounded" width={"12%"} height={64} />
        <Skeleton variant="rounded" width={"12%"} height={64} />
      </MainWrapper>
    );
  }
  const keys = Object.keys(differentCountries).sort((a: string, b: string) => {
    const x = differentCountries[a];
    const y = differentCountries[b];
    if (x < y) {
      return 1;
    } else if (x > y) {
      return -1;
    }
    return 0;
  });
  const countryCountStrings = keys.map(key => {
    if (key.toLowerCase() === "united states") {
      return `US (${differentCountries[key]})`;
    }
    return `${key} (${differentCountries[key]})`;
  });
  return (
    <MainWrapper isLoading={false}>
      <Title variant="h3">
        <b>Jobs List</b>
      </Title>
      <JobInfoTile
        icon={
          <div>
            {isStale ? <WarningIcon width={24} /> : <CheckIcon width={24} />}
          </div>
        }
        title="Last Scrape"
        value={lastScrapedMessage}
      />
      <JobInfoTile
        icon={<WorkIcon />}
        title="Total Listings"
        value={`${numJobs.toString()}`}
      />
      <JobInfoTile
        icon={<EventIcon />}
        title="Earliest Deadline"
        value={earliestDeadline.split(",").slice(0, 1).join(" ")}
        subValue={earliestDeadline.split(",").slice(1).join(" ")}
      />
      <TooltipWrapper
        title={
          <>
            {countryCountStrings.map(x => (
              <Typography>{x}</Typography>
            ))}
          </>
        }
        arrow
      >
        <div>
          <JobInfoTile
            icon={<PublicIcon />}
            title="Countries"
            value={countryCountStrings.length.toString()}
            subValue={`${countryCountStrings.slice(0, 2).join(", ")} ...`}
          />
        </div>
      </TooltipWrapper>
    </MainWrapper>
  );
};
const TooltipWrapper = styled(Tooltip)`
  cursor: pointer;
`;
const Title = styled(Typography)`
  && {
    flex: 1;
  }
`;
interface ILoading {
  isLoading: boolean;
}
const MainWrapper = styled.div<ILoading>`
  display: flex;
  gap: ${props => (props.isLoading ? 4 : 32)}px;
`;
