import { useCallback, useEffect, useMemo, useState } from "react";
import { IJobReview } from "src/database/models/JobReview";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";
import { debounce } from "lodash";

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

export const useCompanyReviewsDataGrid = (companyID: string) => {
  const [jobReviews, setJobReviews] = useState<IJobReview[]>([]);
  const [jobReviewsLoading, setJobReviewsLoading] = useState(true);
  const [voteState, setVoteState] = useState<IVotesState>({});
  const [upvotesQueue, setUpvotesQueue] = useState<Set<string>>(
    new Set<string>()
  );
  const [downvotesQueue, setDownvotesQueue] = useState<Set<string>>(
    new Set<string>()
  );
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
      if (!companyID) {
        return;
      }
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
    }));
  }, [jobReviews]);

  const fireRequest = useCallback(
    debounce(async (upvotesQueue: string[], downvotesQueue: string[]) => {
      await Requests.updateReviewVotes(
        Array.from(upvotesQueue),
        Array.from(downvotesQueue)
      );
      setUpvotesQueue(new Set<string>());
      setDownvotesQueue(new Set<string>());
    }, 1000),
    []
  );

  const onUpvote = (reviewID: string) => {
    //deal with current state
    const currentState = voteState[reviewID].voteType;
    const newVoteState = { ...voteState };
    switch (currentState) {
      case VoteState.UP:
        newVoteState[reviewID].upvotes--;
        newVoteState[reviewID].voteType = VoteState.NONE;
        break;
      case VoteState.DOWN:
        newVoteState[reviewID].downvotes--;
        newVoteState[reviewID].upvotes++;
        newVoteState[reviewID].voteType = VoteState.UP;
        break;
      default:
        newVoteState[reviewID].upvotes++;
        newVoteState[reviewID].voteType = VoteState.UP;
    }
    setVoteState(newVoteState);
    //deal with request debounce
    const newUpvotesQueue = new Set(upvotesQueue);
    const newDownvotesQueue = new Set(downvotesQueue);
    if (currentState === VoteState.DOWN) {
      newDownvotesQueue.has(reviewID)
        ? newDownvotesQueue.delete(reviewID)
        : newDownvotesQueue.add(reviewID);
    }
    newUpvotesQueue.has(reviewID)
      ? newUpvotesQueue.delete(reviewID)
      : newUpvotesQueue.add(reviewID);
    setUpvotesQueue(newUpvotesQueue);
    setDownvotesQueue(newDownvotesQueue);
    fireRequest(Array.from(newUpvotesQueue), Array.from(newDownvotesQueue));
  };

  const onDownvote = (reviewID: string) => {
    //deal with current state
    const currentState = voteState[reviewID].voteType;
    const newVoteState = { ...voteState };
    switch (currentState) {
      case VoteState.DOWN:
        newVoteState[reviewID].downvotes--;
        newVoteState[reviewID].voteType = VoteState.NONE;
        break;
      case VoteState.UP:
        newVoteState[reviewID].upvotes--;
        newVoteState[reviewID].downvotes++;
        newVoteState[reviewID].voteType = VoteState.DOWN;
        break;
      default:
        newVoteState[reviewID].downvotes++;
        newVoteState[reviewID].voteType = VoteState.DOWN;
    }
    setVoteState(newVoteState);
    //deal with request debounce
    const newUpvotesQueue = new Set(upvotesQueue);
    const newDownvotesQueue = new Set(downvotesQueue);
    console.log(newUpvotesQueue, newDownvotesQueue);
    if (currentState === VoteState.UP) {
      newUpvotesQueue.has(reviewID)
        ? newUpvotesQueue.delete(reviewID)
        : newUpvotesQueue.add(reviewID);
    }
    newDownvotesQueue.has(reviewID)
      ? newDownvotesQueue.delete(reviewID)
      : newDownvotesQueue.add(reviewID);
    setUpvotesQueue(newUpvotesQueue);
    setDownvotesQueue(newDownvotesQueue);
    fireRequest(Array.from(newUpvotesQueue), Array.from(newDownvotesQueue));
  };
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
