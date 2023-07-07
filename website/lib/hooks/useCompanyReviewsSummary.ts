import { useEffect, useState } from "react";
import { IReviewsSummary } from "../types/reviews";
import { Requests } from "../requests/Requests";

export const useCompanyReviewsSummary = (companyID: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<IReviewsSummary>();
  useEffect(() => {
    const fire = async () => {
      if (!companyID) {
        return;
      }
      const out = await Requests.getCompanyReviewsSummary(companyID);
      setSummary(out);
      setIsLoading(false);
    };

    fire();
  }, [companyID]);

  return {
    isLoading,
    summary,
  };
};
