import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Paper, SelectChangeEvent } from "@mui/material";
import { Button } from "components/MUI/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Color } from "styles/color";
import Chip from "@mui/material/Chip";
import {
  SearchTypes,
  getSearchTypeName,
  getSearchTypeIcon,
} from "src/lib/search/Search";
import MUIButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { SearchHelpModal } from "../Modals/variants/SearchHelpModal";

// Interfaces
export interface ISearchChip {
  searchType: SearchTypes;
  searchVal: string;
  isActive: boolean;
}

interface ISearchBarJobsListInner {
  chips: ISearchChip[];
  onSearch: (val: string, type: SearchTypes) => string;
  onDeleteChip: (index: number) => void;
  onClearChips: () => void;
  onClickChip: (index: number) => void;
}

interface ISearchBarJobsList {
  onSearchUpdated: (chips: ISearchChip[]) => void;
  setNumActiveChips: (activeChips: number) => void;
  numActiveChips: number;
}

const SearchBarJobsListInner = (props: ISearchBarJobsListInner) => {
  const { chips, onSearch, onDeleteChip, onClearChips, onClickChip } = props;
  const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.All);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (val: SearchTypes) => {
    setSearchType(val);
  };

  const handleSubmit = () => {
    const afterSearchVal = onSearch(searchValue, searchType);
    setSearchValue(afterSearchVal);
  };

  // Chips Component
  const Chips = () => {
    if (chips.length <= 0) {
      return null;
    }
    return (
      <ChipsWrapperWrapper>
        <StyledClearButton onClick={onClearChips}>Clear</StyledClearButton>
        <ChipsWrapper>
          {chips.map(({ searchType, searchVal }, i) => (
            <StyledChip
              isActive={chips[i].isActive}
              onClick={() => {
                onClickChip(i);
              }}
              icon={getSearchTypeIcon(searchType, chips[i].isActive)}
              label={`${getSearchTypeName(searchType)}: ${searchVal}`}
              onDelete={() => {
                onDeleteChip(i);
              }}
              key={i}
            />
          ))}
        </ChipsWrapper>
      </ChipsWrapperWrapper>
    );
  };

  // Search Type Select
  const SearchTypeSelect = () => (
    <StyledSelect
      value={searchType}
      onChange={(event: SelectChangeEvent<unknown>) => {
        handleChange(event.target.value as SearchTypes);
      }}
    >
      {Object.values(SearchTypes).map(
        item =>
          typeof item === "number" && (
            <MenuItem value={item} key={item}>
              {getSearchTypeName(item)}
            </MenuItem>
          )
      )}
    </StyledSelect>
  );

  return (
    <MainWrapper>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <SearchInputWrapper>
          <SearchTypeSelect />
          <StyledTextField
            placeholder="Search"
            value={searchValue}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setSearchValue(event.target.value);
            }}
          />
          <StyledButton>
            <SearchIcon />
          </StyledButton>
        </SearchInputWrapper>
      </form>
      <Chips />
    </MainWrapper>
  );
};

export const SearchBarJobsList = (props: ISearchBarJobsList) => {
  const [chips, setChips] = useState<ISearchChip[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  useEffect(() => {
    props.onSearchUpdated(chips);
  }, [props, chips]);

  const onClearChips = () => {
    setChips([]);
    props.setNumActiveChips(0);
  };

  const onSearch = (val: string, type: SearchTypes) => {
    const searchVal = val.trim();

    if (!searchVal) {
      return "";
    }

    const newChip: ISearchChip = {
      searchVal: val,
      searchType: type,
      isActive: props.numActiveChips > 0 ? true : false,
    };

    if (props.numActiveChips > 0) {
      props.setNumActiveChips(props.numActiveChips + 1);
    }

    let found = false;
    // Update existing chip if exists
    const newChips: ISearchChip[] = chips.map(chip => {
      if (chip.searchType === type) {
        found = true;
        return newChip;
      }
      return chip;
    });

    if (!found) {
      newChips.push(newChip);
    }

    setChips(newChips);
    // Used to clear search
    return "";
  };

  const onDeleteChip = (index: number) => {
    const tempChips = [...chips];
    tempChips.splice(index, 1);
    setChips(tempChips);
  };

  const onClickChip = (index: number) => {
    const chip = chips[index];
    chip.isActive = !chip.isActive;
    if (chip.isActive) {
      props.setNumActiveChips(props.numActiveChips + 1);
    } else {
      props.setNumActiveChips(props.numActiveChips - 1);
    }
  };

  const onSearchHelpClick = () => {
    setIsHelpOpen(true);
  };

  return (
    <SearchWrapper>
      <SearchHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
      <StyledIconButton onClick={onSearchHelpClick}>
        <HelpOutlineOutlinedIcon />
      </StyledIconButton>
      <StyledPaper>
        <SearchBarJobsListInner
          chips={chips}
          onSearch={onSearch}
          onDeleteChip={onDeleteChip}
          onClearChips={onClearChips}
          onClickChip={onClickChip}
        />
      </StyledPaper>
    </SearchWrapper>
  );
};

const StyledTextField = styled(TextField)`
  flex: 1;
  background-color: white;
  margin-right: -4px !important;
`;
const SearchInputWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const MainWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  position: relative;
`;
const StyledButton = styled(Button)`
  && {
    position: relative;
    border-radius: 0 4px 0 0;
  }
`;

const StyledClearButton = styled(MUIButton)`
  && {
    color: black;
  }
`;

const StyledSelect = styled(Select)`
  && {
    position: relative;
    left: 4px;
    z-index: 1;
    border-radius: 4px 0px 0px 0px;
    margin-left: -4px;
    background-color: ${Color.primaryButton};
    color: white;
    font-weight: bold;
  }
  && svg {
    color: white;
  }
`;

const ChipsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const ChipsWrapperWrapper = styled.div`
  padding: 16px 0px 0px 0px;
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
`;

// This is used to prevent passing the prop into dom of the custom component and causing error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledChip = styled(({ isActive, ...rest }) => <Chip {...rest} />)`
  && {
    color: ${props => (props.isActive ? "white" : "black")};
    background-color: ${props =>
      props.isActive ? Color.primaryButton : "white"};
  }
`;

const StyledIconButton = styled(IconButton)`
  && svg {
    color: white;
  }

  && {
    position: absolute;
    right: -40px;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  position: relative;
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 32px;
    border-radius: 4px;
  }
`;
