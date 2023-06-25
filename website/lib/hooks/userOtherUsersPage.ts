import { useEffect, useState } from "react";
import { useUserCompanyReviewsDataGrid } from "./useUserCompanyReviewDataGrid";
import { useUserInterviewReviewsDataGrid } from "./useUserInterviewReviewDataGrid";
import { IUserData } from "src/database/models/UserData";
import { Requests } from "../requests/Requests";
import { useRouter } from "next/router";
import { useUserContext } from "../context/User/UserContext";

export const useOtherUserPage = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const router = useRouter();
  const userID = router.query.userID as string;
  const { user: me } = useUserContext();
  const [user, setUser] = useState<IUserData>();
  useEffect(() => {
    const fire = async () => {
      if (user || !userID) {
        return;
      }
      setUser(await Requests.getUser(userID));
    };

    fire();
  }, [userID, user]);
  const {
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  } = useUserCompanyReviewsDataGrid(userID);
  const {
    reviewRows: interviewRows,
    isLoading: interviewsAreLoading,
    voteState: interviewVoteState,
    onUpvote: interviewUpvote,
    onDownvote: interviewDownnvote,
    fetchReviews: fetchInterviews,
  } = useUserInterviewReviewsDataGrid(userID);

  const isLoading = !user;

  return {
    me,
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
    interviewRows,
    interviewsAreLoading,
    interviewVoteState,
    interviewUpvote,
    interviewDownnvote,
    fetchInterviews,
  };
};
