import { useCallback, useEffect, useMemo, useState } from "react";
import { IJobReview } from "src/database/models/JobReview";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";
import { useVoteHelpful } from "./useVoteHelpful";
import { IJobReviewRow } from "./useCompanyReviewsDataGrid";

export const useMyCompanyReviewsDataGrid = () => {
  const [jobReviews, setJobReviews] = useState<IJobReview[]>([]);
  const [jobReviewsLoading, setJobReviewsLoading] = useState(true);
  const { user } = useUserContext();
  const { voteState } = useVoteHelpful(jobReviews, Requests.updateReviewVotes);

  const fetchReviews = useCallback(async () => {
    try {
      if (!user) {
        return;
      }
      setJobReviews([]);
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
      roleName: x.role?.role ?? "",
      username: x.user?.username ?? "",
      totalRating:
        (x.mentorshipRating ?? 0) +
        (x.workLifeRating ?? 0) +
        (x.meaningfulRating ?? 0),
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
