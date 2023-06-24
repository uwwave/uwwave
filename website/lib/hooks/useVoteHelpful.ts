import { useCallback, useEffect, useState } from "react";
import {
  IVotesState,
  VoteState,
} from "src/lib/hooks/useCompanyReviewsDataGrid";
import { useUserContext } from "src/lib/context/User/UserContext";
import { debounce } from "lodash";

interface IVotable {
  id: string;
  upvoters: string[];
  downvoters: string[];
}
export const useVoteHelpful = (
  reviews: IVotable[],
  updateVotesRequest: (
    upvoters: string[],
    downvoters: string[]
  ) => Promise<undefined>
) => {
  const { user } = useUserContext();
  const [voteState, setVoteState] = useState<IVotesState>({});
  const [upvotesQueue, setUpvotesQueue] = useState<Set<string>>(
    new Set<string>()
  );
  const [downvotesQueue, setDownvotesQueue] = useState<Set<string>>(
    new Set<string>()
  );

  useEffect(() => {
    const newVotesState: IVotesState = {};
    reviews.forEach(review => {
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
  }, [reviews]);

  const fireRequest = useCallback(
    debounce(async (upvotesQueue: string[], downvotesQueue: string[]) => {
      await updateVotesRequest(
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
  return {
    voteState,
    onUpvote,
    onDownvote,
  };
};
