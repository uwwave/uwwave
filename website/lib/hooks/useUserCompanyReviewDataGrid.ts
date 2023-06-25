import { useCallback, useEffect, useMemo, useState } from "react";
import { IJobReview } from "src/database/models/JobReview";
import { Requests } from "src/lib/requests/Requests";
import { useVoteHelpful } from "./useVoteHelpful";
import { IJobReviewRow } from "./useCompanyReviewsDataGrid";

export const useUserCompanyReviewsDataGrid = (userID: string) => {
  const [jobReviews, setJobReviews] = useState<IJobReview[]>([]);
  const [jobReviewsLoading, setJobReviewsLoading] = useState(true);
  const { voteState, onUpvote, onDownvote } = useVoteHelpful(
    jobReviews,
    Requests.updateReviewVotes
  );

  const fetchReviews = useCallback(async () => {
    try {
      if (!userID) {
        return;
      }
      setJobReviews([]);
      setJobReviews(await Requests.getUserJobReviews(userID));
      setJobReviewsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [userID]);

  useEffect(() => {
    fetchReviews();
  }, [userID]);

  const jobReviewRows: IJobReviewRow[] = useMemo(() => {
    return jobReviews.map(x => ({
      ...x,
      roleName: x.role.role,
      username: x.user.username,
    }));
  }, [jobReviews]);

  return {
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  };
};
