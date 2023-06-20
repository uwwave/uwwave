import { useState } from "react";
import { debounce } from "lodash";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { Requests } from "src/lib/requests/Requests";
import { IJobRole } from "src/database/models/JobRole";

export const useAddReviewModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRolesLoading, setIsRolesLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<ICompanyClearbitData[]>([]);
  const [rolesInfo, setRolesInfo] = useState<IJobRole[]>([]);

  const debouncedSearch = debounce(async value => {
    setIsLoading(true);
    setCompanyInfo(await Requests.queryCompanies(value));
    setIsLoading(false);
  }, 500);

  const debouncedRoleSearch = debounce(async value => {
    if (!value) {
      setRolesInfo([]);
      return;
    }
    setIsRolesLoading(true);
    const out = await Requests.queryJobRoles(value);
    setRolesInfo(out.length > 0 ? out : [{ role: "Other", id: "0" }]);
    setIsRolesLoading(false);
  }, 500);

  const handleSearch = (val: string) => {
    debouncedSearch(val);
  };

  const handleSearchRole = (val: string) => {
    debouncedRoleSearch(val);
  };

  return {
    handleSearch,
    companyInfo,
    isLoading,
    handleSearchRole,
    isRolesLoading,
    rolesInfo,
  };
};
