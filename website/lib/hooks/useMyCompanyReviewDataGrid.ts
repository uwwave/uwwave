import { useCallback, useEffect, useMemo, useState } from "react";
import { IJobReview } from "src/database/models/JobReview";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";

export interface IJobReviewRow extends IJobReview {
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

export const useMyCompanyReviewsDataGrid = () => {
  const [jobReviews, setJobReviews] = useState<IJobReview[]>([]);
  const [jobReviewsLoading, setJobReviewsLoading] = useState(true);
  const [voteState, setVoteState] = useState<IVotesState>({});
  const { user } = useUserContext();

  useEffect(() => {
    const newVotesState: IVotesState = {};
    jobReviews.forEach(review => {
      let voteType = VoteState.NONE;
      if (!user) {
        newVotesState[review.id] = {
          voteType,
          upvotes: review.upvoters?.length ?? 0,
          downvotes: review.downvoters?.length ?? 0,
        };
        return;
      }
      if (review.upvoters?.map(x => x.toString()).includes(user.id)) {
        voteType = VoteState.UP;
      } else if (review.downvoters?.map(x => x.toString()).includes(user.id)) {
        voteType = VoteState.DOWN;
      }
      newVotesState[review.id] = {
        voteType,
        upvotes: review.upvoters?.length ?? 0,
        downvotes: review.downvoters?.length ?? 0,
      };
    });
    setVoteState(newVotesState);
  }, [jobReviews]);

  const fetchReviews = useCallback(async () => {
    try {
      if (!user) {
        return;
      }
      setJobReviews(await Requests.getUserJobReviews(user.id));
      setJobReviewsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const jobReviewRows: IJobReviewRow[] = useMemo(() => {
    return jobReviews.map(x => ({
      ...x,
      roleName: x.role.role,
      username: x.user.username,
    }));
  }, [jobReviews]);

  const onUpvote = (reviewID: string) => {
    console.log(reviewID);
  };

  const onDownvote = (reviewID: string) => {
    console.log(reviewID);
  };

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
