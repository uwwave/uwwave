import { useEffect, useState } from "react";
import { IMetricGoals, Requests } from "src/lib/requests/Requests";

export const useAdminStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountsCreated, setAccountsCreated] = useState(0);
  const [extensionInstalls, setExtensionInstalls] = useState(0);
  const [jobReviews, setJobReviews] = useState(0);
  const [interviewReviews, setInterviewReviews] = useState(0);
  const [goals, setGoals] = useState<IMetricGoals>();

  useEffect(() => {
    const fire = async () => {
      const [
        accountsCreatedRes,
        extensionInstallsRes,
        metricGoaolsRes,
        userReviews,
      ] = await Promise.all([
        Requests.getUserAccountsCreated(),
        Requests.getExtensionInstalls(),
        Requests.getMetricGoals(),
        Requests.getUserReviews(),
      ]);
      setAccountsCreated(accountsCreatedRes);
      setExtensionInstalls(extensionInstallsRes);
      setJobReviews(userReviews.jobReviews);
      setInterviewReviews(userReviews.interviewReviews);
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
    jobReviews,
    interviewReviews,
  };
};
