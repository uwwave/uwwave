import { useRouter } from "next/router";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useUserContext } from "src/lib/context/User/UserContext";
import { useEffect, useState } from "react";
import { useMyCompanyReviewsDataGrid } from "src/lib/hooks/useMyCompanyReviewDataGrid";

export const useUserPage = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const { isLoading: isUserLoading, user } = useUserContext();
  const router = useRouter();
  const { open: openLoginModal } = useLoginModalContext();
  const {
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  } = useMyCompanyReviewsDataGrid();
  useEffect(() => {
    if (!isUserLoading && !user) {
      openLoginModal();
    }
  }, [isUserLoading, user]);

  useEffect(() => {
    const tab = parseInt(router.query.tab as string);
    if (Number.isNaN(tab)) {
      return;
    }
    setTabSelected(tab);
  }, [router]);

  const isLoading = isUserLoading || !user;

  return {
    isLoading,
    user,
    tabSelected,
    setTabSelected,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  };
};
