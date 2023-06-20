import { useState } from "react";
import { debounce } from "lodash";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { Requests } from "src/lib/requests/Requests";

export const useCompanySearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<ICompanyClearbitData[]>([]);

  const debouncedSearch = debounce(async value => {
    setIsLoading(true);
    setCompanyInfo(await Requests.queryCompanies(value));
    setIsLoading(false);
  }, 500);

  const handleSearch = (val: string) => {
    debouncedSearch(val);
  };

  return {
    handleSearch,
    companyInfo,
    isLoading,
  };
};
