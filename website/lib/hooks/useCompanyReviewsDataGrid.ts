import { useCallback, useEffect, useMemo, useState } from "react";
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

export const useCompanyReviewsDataGrid = (companyID: string) => {
  const [jobReviews, setJobReviews] = useState<IJobReview[]>([]);
  const [jobReviewsLoading, setJobReviewsLoading] = useState(true);
  const { user } = useUserContext();
  const { voteState, onUpvote, onDownvote } = useVoteHelpful(
    jobReviews,
    Requests.updateReviewVotes
  );

  const fetchReviews = useCallback(async () => {
    try {
      if (!companyID) {
        return;
      }
      setJobReviews([]);
      setJobReviews(await Requests.getJobReviews(companyID));
      setJobReviewsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [companyID]);

  useEffect(() => {
    fetchReviews();
  }, [companyID]);

  const jobReviewRows: IJobReviewRow[] = useMemo(() => {
    return jobReviews.map(x => ({
      ...x,
      roleName: x.role.role,
      username: x.user.username,
      totalRating: x.mentorshipRating + x.workLifeRating + x.meaningfulRating,
    }));
  }, [jobReviews]);

  const myReviewsRows: IJobReviewRow[] = useMemo(() => {
    if (!user) {
      return [];
    }
    return jobReviewRows.filter(x => x.user.id === user.id);
  }, [jobReviewRows]);

  return {
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
    myReviewsRows,
  };
};
