import React from "react";
import {
  IMenuItem,
  SearchWithMenuInput,
} from "src/components/TextField/SearchWithMenuInput";
import BusinessIcon from "@mui/icons-material/Business";
import styled from "styled-components";
import { Color } from "src/styles/color";
import { useCompanySearch } from "src/lib/hooks/useCompanySearch";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";

interface ICompanySearchInput {
  onValue?: (data?: ICompanyClearbitData) => void;
  onIn?: () => void;
  onOut?: () => void;
  clearOnValue?: boolean;
  error?: boolean;
  emptyMenuItem?: IMenuItem;
  initCompany?: ICompanyClearbitData;
}
export const CompanySearchInput = ({
  onValue,
  onIn,
  onOut,
  error,
  emptyMenuItem,
  initCompany,
}: ICompanySearchInput) => {
  const { companyInfo, handleSearch, isLoading } = useCompanySearch();
  return (
    <SearchWithMenuInput
      error={error}
      menuItems={
        companyInfo.length
          ? [
              ...companyInfo.map(x => ({
                value: x.companyName,
                icon: x.logo ? (
                  <CompanyLogo logo={x.logo} />
                ) : (
                  <StyledBusinessIcon />
                ),
              })),
              ...(emptyMenuItem ? [emptyMenuItem] : []),
            ]
          : emptyMenuItem
          ? [emptyMenuItem]
          : []
      }
      selectedIcon={<StyledBusinessIcon />}
      onChangeValue={val => {
        if (val === emptyMenuItem?.value) {
          onValue &&
            onValue({
              id: "0",
              companyName: emptyMenuItem.value,
              name: emptyMenuItem.value,
            });
          return;
        }
        const data = companyInfo.find(x => x.companyName === val);
        if (!data && initCompany) {
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
      initialValue={
        initCompany
          ? {
              value: initCompany.companyName,
              icon: initCompany.logo ? (
                <CompanyLogo logo={initCompany.logo} />
              ) : undefined,
            }
          : undefined
      }
    />
  );
};

export const StyledBusinessIcon = styled(BusinessIcon)`
  && {
    color: ${Color.rating};
    font-size: 32px;
  }
`;

interface ICompanyLogo {
  logo: string;
}

export const CompanyLogo = styled.div<ICompanyLogo>`
  width: 32px;
  height: 32px !important;
  background-image: url(${props => props.logo});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
`;
