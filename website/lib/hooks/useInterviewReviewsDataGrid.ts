import { useCallback, useEffect, useMemo, useState } from "react";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";
import { useVoteHelpful } from "./useVoteHelpful";
import { IInterviewReview } from "src/database/models/InterviewReview";

export interface IInterviewReviewRow extends IInterviewReview {
  roleName: string;
  username: string;
}

export enum VoteState {
  NONE,
  UP,
  DOWN,
}
export interface IVotesState {
  [reviewID: string]: {
    voteType: VoteState;
    upvotes: number;
    downvotes: number;
  };
}

export const useInterviewReviewsDataGrid = (companyID: string) => {
  const [reviews, setReviews] = useState<IInterviewReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const { voteState, onUpvote, onDownvote } = useVoteHelpful(
    reviews,
    Requests.updateInterviewReviewVotes
  );

  const fetchReviews = useCallback(async () => {
    try {
      if (!companyID) {
        return;
      }
      setReviews([]);
      setReviews(await Requests.getInterviewReviews(companyID));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [companyID]);

  useEffect(() => {
    fetchReviews();
  }, [companyID]);

  const reviewRows: IInterviewReviewRow[] = useMemo(() => {
    return reviews.map(x => ({
      ...x,
      roleName: x.role?.role ?? "",
      username: x.user?.username ?? "",
    }));
  }, [reviews]);

  const myReviewsRows: IInterviewReviewRow[] = useMemo(() => {
    if (!user) {
      return [];
    }
    return reviewRows.filter(x => x.user?.id && x.user.id === user.id);
  }, [reviewRows, user]);

  return {
    reviewRows,
    isLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
    myReviewsRows,
  };
};
