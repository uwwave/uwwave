import { useReventInterviewsDataGrid } from "src/lib/hooks/useRecentInterviewsDataGrid";
import { Page } from "src/lib/types/page";
import { InterviewsDataGrid } from "../InterviewsDataGrid";

export const ReventInterviewsDataGrid = () => {
  const {
    user,
    reviewRows,
    isLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  } = useReventInterviewsDataGrid();
  return (
    <InterviewsDataGrid
      user={user}
      reviewRows={reviewRows}
      isLoading={isLoading}
      voteState={voteState}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onEditReview={fetchReviews}
      origin={Page.PROFILE}
      removeHeader
    />
  );
};
