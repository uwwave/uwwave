import { useState } from "react";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { Requests } from "../requests/Requests";

export const useSubmitDomainInput = (
  onSuccess: (company: ICompanyClearbitData) => void
) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState("");

  const onSubmit = async () => {
    setError("");
    setIsLoading(true);
    if (!val) {
      return;
    }
    try {
      const out = await Requests.addCompanyDomain(val);
      onSuccess(out);
    } catch (e: any) {
      setError(e.response.data);
    }
    setIsLoading(false);
  };
  return {
    error,
    isLoading,
    val,
    setVal,
    onSubmit,
  };
};
