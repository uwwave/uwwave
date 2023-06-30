import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
import { Spacer } from "../Spacer/Spacer";

interface IFilterJobsList {
  filterStates: FilterStates;
  setFilterStates: (filterstates: FilterStates) => void;
}

export const FilterJobsList = (props: IFilterJobsList) => {
  const { filterStates, setFilterStates } = props;

  return (
    <FiltersWrapper>
      <StyledPaper>
        {filterStates &&
          Object.entries(filterStates).map(([category, filters]) => (
            <FilterGroup key={category}>
              <div>
                <Typography color="white" sx={{ fontSize: "1.1rem" }}>
                  <b>{category}</b>
                </Typography>
              </div>
              <Spacer height={8} />
              <ChipsWrapper>
                {Object.entries(filters).map(([tag, state]) => (
                  <StyledChip
                    onClick={() => {
                      const newFilterStates: FilterStates = { ...filterStates };
                      category === JobFilters.appDocFilter
                        ? (newFilterStates[category as JobFilters.appDocFilter][
                            tag as AppDocFilterTags
                          ] = ((state as FilterState) + 1) % 3)
                        : category === JobFilters.durationFilter
                        ? (newFilterStates[
                            category as JobFilters.durationFilter
                          ][tag as DurationFilterTags] =
                            ((state as FilterState) + 1) % 3)
                        : category === JobFilters.specialReqFilter
                        ? (newFilterStates[
                            category as JobFilters.specialReqFilter
                          ][tag as SpecialReqFilterTags] =
                            ((state as FilterState) + 1) % 3)
                        : null;
                      setFilterStates(newFilterStates);
                    }}
                    label={tag}
                    icon={getFilterChipIcon(state as FilterState)}
                    key={tag}
                  />
                ))}
              </ChipsWrapper>
            </FilterGroup>
          ))}
      </StyledPaper>
    </FiltersWrapper>
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

const FiltersWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  position: relative;
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 32px;
    border-radius: 16px;
    background-color: ${BackgroundColor.darker};
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const FilterGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
