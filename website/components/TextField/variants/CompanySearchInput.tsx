import React from "react";
import { SearchWithMenuInput } from "src/components/TextField/SearchWithMenuInput";
import BusinessIcon from "@mui/icons-material/Business";
import styled from "styled-components";
import { Color } from "src/styles/color";
import { useCompanySearch } from "src/lib/hooks/useCompanySearch";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";

interface ICompanySearchInput {
  onValue?: (data: ICompanyClearbitData) => void;
  onIn?: () => void;
  onOut?: () => void;
}
export const CompanySearchInput = ({
  onValue,
  onIn,
  onOut,
}: ICompanySearchInput) => {
  const { companyInfo, handleSearch, isLoading } = useCompanySearch();
  return (
    <SearchWithMenuInput
      menuItems={companyInfo.map(x => ({
        value: x.companyName,
        icon: x.logo ? <CompanyLogo logo={x.logo} /> : <StyledBusinessIcon />,
      }))}
      selectedIcon={<StyledBusinessIcon />}
      onChangeValue={val => {
        const data = companyInfo.find(x => x.companyName === val);
        if (!data) {
          return;
        }
        onValue && onValue(data);
      }}
      onChangeSearchValue={handleSearch}
      isLoading={isLoading}
      placeholder="Search Companies"
      zIndex={101}
      onIn={onIn}
      onOut={onOut}
    />
  );
};

const StyledBusinessIcon = styled(BusinessIcon)`
  && {
    color: ${Color.rating};
    font-size: 32px;
  }
`;

interface ICompanyLogo {
  logo: string;
}

const CompanyLogo = styled.div<ICompanyLogo>`
  width: 32px;
  height: 32px !important;
  background-image: url(${props => props.logo});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
`;
