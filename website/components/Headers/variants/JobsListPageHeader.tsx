import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { JobInfoTile } from "src/components/JobInfoTile/JobInfoTile";
import { WarningIcon } from "src/components/icons/WarningIcon";
import { CheckIcon } from "src/components/icons/CheckIcon";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import Tooltip from "@mui/material/Tooltip";
import PublicIcon from "@mui/icons-material/Public";
import { getCountryFlag } from "../../CountryFlag/CountryFlag";
import { Spacer } from "../../Spacer/Spacer";
import { BasePageHeader } from "src/components/Headers/BasePageHeader";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { calculateDaysFromNow } from "src/lib/dates/dates";

interface IJobsListPageHeader {
  numJobs: number;
  earliestDeadline: string;
  differentCountries: { [country: string]: number };
  isLoading: boolean;
}
export const JobsListPageHeader = (props: IJobsListPageHeader) => {
  const { numJobs, earliestDeadline, differentCountries, isLoading } = props;
  const { isStale, dataAgeMessage } = useExtensionsDataContext();
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
    <BasePageHeader
      isLoading={isLoading}
      infoTiles={
        numJobs || isLoading
          ? [
              <JobInfoTile
                icon={
                  <div style={{ height: "24px" }}>
                    {isStale ? (
                      <WarningIcon width={20} />
                    ) : (
                      <CheckIcon width={20} />
                    )}
                  </div>
                }
                title="Last Scrape"
                value={dataAgeMessage}
                alignCenter
              />,
              <JobInfoTile
                icon={<WorkIcon />}
                title="Total Listings"
                value={`${numJobs.toString()}`}
                alignCenter
              />,
              <JobInfoTile
                icon={<EventIcon />}
                title="Earliest Deadline"
                subValue={earliestDeadline}
                value={calculateDaysFromNow(new Date(earliestDeadline))}
                alignCenter
              />,
              <TooltipWrapper
                title={
                  <>
                    {keys.map(x => (
                      <div key={x}>
                        <CountryWrapper>
                          {getCountryFlag(x ?? "")}
                          <Typography>{`${x} (${differentCountries[x]})`}</Typography>
                        </CountryWrapper>
                        <Spacer height={8} />
                      </div>
                    ))}
                  </>
                }
                arrow
                placement="bottom-end"
              >
                <div>
                  <JobInfoTile
                    icon={<PublicIcon />}
                    title="Countries"
                    value={countryCountStrings.length.toString()}
                    subValue={`${countryCountStrings.slice(0, 2).join(", ")} ${
                      countryCountStrings.length > 2 ? "..." : ""
                    }`}
                    alignCenter
                  />
                </div>
              </TooltipWrapper>,
            ]
          : []
      }
    />
  );
};

const CountryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const TooltipWrapper = styled(Tooltip)`
  cursor: pointer;
`;
