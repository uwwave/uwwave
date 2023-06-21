import { RoundedTextField } from "src/components/TextField/RoundedTextField";
import styled from "styled-components";
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface ISingleValueSearch {
  value: string;
  icon?: React.ReactNode;
}
export const SingleValueSearch = ({ value, icon }: ISingleValueSearch) => {
  return (
    <StyledRoundedTextField
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon ?? <SearchIcon />}
          </InputAdornment>
        ),
      }}
      value={value}
      disabled
    />
  );
};

const StyledRoundedTextField = styled(RoundedTextField)`
  && div input {
    padding-left: 0;
  }

  &&,
  && div {
    height: 48px;
  }
`;
