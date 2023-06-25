import { useCallback, useEffect, useMemo, useState } from "react";
import { Requests } from "src/lib/requests/Requests";
import { useVoteHelpful } from "./useVoteHelpful";
import { IInterviewReview } from "src/database/models/InterviewReview";
import { IInterviewReviewRow } from "./useInterviewReviewsDataGrid";

export const useUserInterviewReviewsDataGrid = (userID: string) => {
  const [reviews, setReviews] = useState<IInterviewReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { voteState, onDownvote, onUpvote } = useVoteHelpful(
    reviews,
    Requests.updateReviewVotes
  );

  const fetchReviews = useCallback(async () => {
    try {
      if (!userID) {
        return;
      }
      setReviews([]);
      setReviews(await Requests.getUserInterviewReviews(userID));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [userID]);

  useEffect(() => {
    fetchReviews();
  }, [userID]);

  const reviewRows: IInterviewReviewRow[] = useMemo(() => {
    return reviews.map(x => ({
      ...x,
      roleName: x.role.role,
      username: x.user.username,
    }));
  }, [reviews]);

  return {
    reviewRows,
    isLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  };
};
