import { useCallback, useEffect, useMemo, useState } from "react";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";
import { useVoteHelpful } from "./useVoteHelpful";
import { IInterviewReview } from "src/database/models/InterviewReview";
import { IInterviewReviewRow } from "./useInterviewReviewsDataGrid";

export const useMyInterviewReviewsDataGrid = () => {
  const [reviews, setReviews] = useState<IInterviewReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const { voteState } = useVoteHelpful(reviews, Requests.updateReviewVotes);

  const fetchReviews = useCallback(async () => {
    try {
      if (!user) {
        return;
      }
      setReviews([]);
      setReviews(await Requests.getUserInterviewReviews(user.id));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const reviewRows: IInterviewReviewRow[] = useMemo(() => {
    return reviews.map(x => ({
      ...x,
      roleName: x.role?.role ?? "",
      username: x.user?.username ?? "",
    }));
  }, [reviews]);

  const onUpvote = (reviewID: string) => {
    console.log(reviewID);
  };

  const onDownvote = (reviewID: string) => {
    console.log(reviewID);
  };

  return {
    user,
    reviewRows,
    isLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  };
};
