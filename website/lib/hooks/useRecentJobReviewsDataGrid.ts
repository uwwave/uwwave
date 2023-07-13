import { useCallback, useMemo, useState, useEffect } from "react";
import { IJobReview } from "src/database/models/JobReview";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";
import { useVoteHelpful } from "./useVoteHelpful";

export interface IJobReviewRow extends IJobReview {
  roleName: string;
  username: string;
  totalRating: number;
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

export const useRecentJobReviewsDataGrid = () => {
  const [jobReviews, setJobReviews] = useState<IJobReview[]>([]);
  const [jobReviewsLoading, setJobReviewsLoading] = useState(true);
  const { user } = useUserContext();
  const { voteState, onUpvote, onDownvote } = useVoteHelpful(
    jobReviews,
    Requests.updateReviewVotes
  );

  const fetchReviews = useCallback(async () => {
    try {
      setJobReviews([]);
      setJobReviews(await Requests.getRecentReviews());
      setJobReviewsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const jobReviewRows: IJobReviewRow[] = useMemo(() => {
    return jobReviews.map(x => ({
      ...x,
      roleName: x.role?.role ?? "",
      username: x.user?.username ?? "",
      totalRating:
        (x.mentorshipRating ?? 0) +
        (x.workLifeRating ?? 0) +
        (x.meaningfulRating ?? 0),
    }));
  }, [jobReviews]);

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  };
};
