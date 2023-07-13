import { useRecentJobReviewsDataGrid } from "src/lib/hooks/useRecentJobReviewsDataGrid";
import { ReviewsDataGrid } from "../ReviewsDataGrid";
import { Page } from "src/lib/types/page";

export const RecentReviewsDataGrid = () => {
  const {
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  } = useRecentJobReviewsDataGrid();
  return (
    <ReviewsDataGrid
      user={user}
      jobReviewRows={jobReviewRows}
      jobReviewsLoading={jobReviewsLoading}
      voteState={voteState}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onEditReview={fetchReviews}
      origin={Page.PROFILE}
      removeHeader
    />
  );
};
