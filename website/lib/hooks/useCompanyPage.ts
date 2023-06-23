import { useEffect, useState, useMemo } from "react";
import { Requests } from "src/lib/requests/Requests";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { useRouter } from "next/router";
import { useCompanyReviewsDataGrid } from "./useCompanyReviewsDataGrid";
import { useExtensionsDataContext } from "../context/ExtensionData/ExtensionDataContext";

export const useCompanyPage = (companyID?: string) => {
  const [companyInfo, setCompanyInfo] = useState<ICompanyClearbitData>();
  const [infoModal, setInfoModal] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);
  const { coopJobsListPageRows: jobs } = useExtensionsDataContext();
  const {
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
    myReviewsRows,
  } = useCompanyReviewsDataGrid(companyID ?? "");
  const router = useRouter();

  const onClearbitData = (data: ICompanyClearbitData) => {
    setCompanyInfo(data);
  };

  useEffect(() => {
    const fire = async () => {
      if (!companyID) {
        return;
      }
      try {
        setCompanyInfo(await Requests.getCompanyInfoByID(companyID));
      } catch (e) {
        console.log(e);
      }
    };
    fire();
  }, [companyID]);

  useEffect(() => {
    const tab = parseInt(router.query.tab as string);
    if (Number.isNaN(tab)) {
      return;
    }
    setTabSelected(tab);
  }, [router]);

  const isLoading = !companyInfo;

  const jobsCount: number = useMemo(() => {
    return jobs.filter(x => x.companyName === companyInfo?.companyName).length;
  }, [jobs, companyInfo]);
  return {
    companyInfo,
    isLoading,
    infoModal,
    setInfoModal,
    onClearbitData,
    tabSelected,
    setTabSelected,
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    myReviewsRows,
    fetchReviews,
    jobsCount,
  };
};
