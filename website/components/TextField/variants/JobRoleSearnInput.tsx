import React from "react";
import { SearchWithMenuInput } from "src/components/TextField/SearchWithMenuInput";
import styled from "styled-components";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { IJobRole } from "src/database/models/JobRole";
import { useJobsRolesSearch } from "src/lib/hooks/useJobRolesSearch";

interface ICompanySearchInput {
  onValue?: (data?: IJobRole) => void;
  error?: boolean;
  disabled?: boolean;
}
export const JobRoleSearchInput = ({
  onValue,
  error,
  disabled,
}: ICompanySearchInput) => {
  const { rolesInfo, handleSearch, isLoading } = useJobsRolesSearch();
  return (
    <SearchWithMenuInput
      menuItems={rolesInfo.map(x => ({
        value: x.role,
        icon: <RoleIcon />,
      }))}
      selectedIcon={<RoleIcon />}
      onChangeValue={val => {
        const data = rolesInfo.find(x => x.role === val);
        onValue && onValue(data);
      }}
      onChangeSearchValue={handleSearch}
      isLoading={isLoading}
      placeholder="Role"
      error={error}
      disabled={disabled}
    />
  );
};

const RoleIcon = styled(WorkOutlineIcon)`
  && {
    font-size: 32px;
  }
`;
