import { useEffect, useState } from "react";
import { IMetricGoals, Requests } from "src/lib/requests/Requests";

export const useAdminStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountsCreated, setAccountsCreated] = useState(0);
  const [extensionInstalls, setExtensionInstalls] = useState(0);
  const [goals, setGoals] = useState<IMetricGoals>();

  useEffect(() => {
    const fire = async () => {
      const [accountsCreatedRes, extensionInstallsRes, metricGoaolsRes] =
        await Promise.all([
          Requests.getUserAccountsCreated(),
          Requests.getExtensionInstalls(),
          Requests.getMetricGoals(),
        ]);
      setAccountsCreated(accountsCreatedRes);
      setExtensionInstalls(extensionInstallsRes);
      setGoals(metricGoaolsRes);
      setIsLoading(false);
    };
    fire();
  }, []);

  return {
    isLoading,
    accountsCreated,
    extensionInstalls,
    goals,
  };
};
