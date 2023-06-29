import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  AppDocFilterTags,
  DurationFilterTags,
  JobFilters,
  SpecialReqFilterTags,
} from "src/lib/extension/jobFilters";
import { getFilterChipIcon } from "src/lib/filter/filterChipsIcon";
import { FilterState, FilterStates } from "src/lib/filter/jobsFilterEval";
import { BackgroundColor, Color } from "src/styles/color";
import styled from "styled-components";

export const FilterJobsList = () => {
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

  return (
    <FilterWrapper>
      <StyledPaper>
        <ChipsWrapper>
          {Object.entries(filterStates[JobFilters.appDocFilter]).map(
            ([key, value]) => (
              <StyledChip
                onClick={() => {
                  const newFilterStates = { ...filterStates };
                  newFilterStates[JobFilters.appDocFilter][
                    key as AppDocFilterTags
                  ] = (value + 1) % 3;
                  setFilterStates(newFilterStates);
                }}
                label={key}
                icon={getFilterChipIcon(value)}
              />
            )
          )}
        </ChipsWrapper>
        {/* <StyledChip
        onClick={() => {
          onClickChip(i);
        }}
        icon={getSearchTypeIcon(searchType, chips[i].isActive)}
        label={`${getSearchTypeName(searchType)}: ${searchVal}`}
        key={i}
      /> */}
      </StyledPaper>
    </FilterWrapper>
  );
};

const StyledChip = styled(Chip)`
  && {
    background-color: white;
  }
  &&&:hover {
    background-color: ${Color.hover};
  }
`;

const ChipsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  position: relative;
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 32px;
    border-radius: 16px;
    background-color: ${BackgroundColor.darker};
  }
`;
