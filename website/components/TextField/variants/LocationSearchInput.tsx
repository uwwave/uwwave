import React from "react";
import {
  IMenuItem,
  SearchWithMenuInput,
} from "src/components/TextField/SearchWithMenuInput";
import styled from "styled-components";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useLocationsSearch } from "src/lib/hooks/useLocationsSearch";
import { getCountryFlag } from "src/components/CountryFlag/CountryFlag";

interface ICompanySearchInput {
  onValue?: (data?: string) => void;
  initialValue?: IMenuItem;
  error?: boolean;
}
export const LocationsSearchInput = ({
  onValue,
  error,
  initialValue,
}: ICompanySearchInput) => {
  const { locations, handleSearch } = useLocationsSearch();
  return (
    <SearchWithMenuInput
      menuItems={locations.map(x => ({
        value: x.city.startsWith("Remote in")
          ? x.city
          : `${x.city} ${x.state}, ${x.country}`,
        icon: getCountryFlag(x.country),
      }))}
      selectedIcon={<RoleIcon />}
      onChangeValue={val => {
        onValue && onValue(val);
      }}
      onChangeSearchValue={handleSearch}
      isLoading={false}
      placeholder="City"
      error={error}
      initialValue={initialValue}
    />
  );
};

const RoleIcon = styled(WorkOutlineIcon)`
  && {
    font-size: 32px;
  }
`;
