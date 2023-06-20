import { useState } from "react";
import { debounce } from "lodash";
import { Requests } from "src/lib/requests/Requests";
import { IJobRole } from "src/database/models/JobRole";

export const useJobsRolesSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rolesInfo, setRolesInfo] = useState<IJobRole[]>([]);

  const debouncedRoleSearch = debounce(async value => {
    setIsLoading(true);
    const out = await Requests.queryJobRoles(value);
    setRolesInfo(out.length > 0 ? out : [{ role: "Other", id: "0" }]);
    setIsLoading(false);
  }, 500);

  const handleSearch = (val: string) => {
    debouncedRoleSearch(val);
  };

  return {
    handleSearch,
    rolesInfo,
    isLoading,
  };
};
