import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { ProfileHeaderCard } from "src/components/HeaderCard/variants/ProfileHeaderCards";
import { useUserPage } from "src/lib/hooks/useUserPage";
import { Tabs } from "src/components/Tabs/Tabs";
import { Spacer } from "src/components/Spacer/Spacer";
import { LogoLoader } from "src/components/Loader/LogoLoader";
import { Center } from "src/components/Center/Center";
import { Color } from "src/styles/color";
import { DataGridHeader } from "src/components/DataGrid/DataGridHeader";
import { getProfileImage } from "src/lib/types/profiles";
import { ReviewsEmptyState } from "src/components/Empty/JobReviewsEmptyState";
import { ReviewsDataGrid } from "src/components/DataGrid/ReviewsDataGrid";
import { Page } from "src/lib/types/page";

const UserPage = () => {
  const {
    isLoading,
    user,
    tabSelected,
    setTabSelected,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
  } = useUserPage();
  const renderHeader = () => (
    <ProfileHeaderCard
      imageURL={getProfileImage(user?.profilePicture)}
      username={user?.username ?? ""}
      isLoading={isLoading}
      dateJoined={user?.dateJoined}
      canEditPhoto
    />
  );

  const renderMyReviewsTabs = () => {
    const renderTableBody = () =>
      jobReviewRows.length ? (
        <ReviewsDataGrid
          user={user}
          jobReviewRows={jobReviewRows}
          jobReviewsLoading={jobReviewsLoading}
          voteState={voteState}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          onEditReview={fetchReviews}
          origin={Page.PROFILE}
        />
      ) : (
        <ReviewsEmptyState
          onClose={fetchReviews}
          origin={Page.PROFILE}
          title="You have 0 Job Reviews! Submit a review to share your experience:"
        />
      );

    const renderInterviewsTableBody = () => (
      <ReviewsEmptyState
        onClose={fetchReviews}
        origin={Page.PROFILE}
        title="You have 0 Interview Reviews! Submit a review to share your experience:"
      />
    );
    return (
      <>
        <DataGridHeader title="Job Reviews" color={Color.rating} />
        {renderTableBody()}
        <Spacer height={32} />
        <DataGridHeader title="Interview Reviews" color={Color.compatibility} />
        {renderInterviewsTableBody()}
      </>
    );
  };
  const renderBody = () => {
    if (isLoading) {
      return (
        <Center>
          <LogoLoader width={64} darkMode />
        </Center>
      );
    }
    const comps = <>{tabSelected === 1 ? renderMyReviewsTabs() : null}</>;

    const tabLabels = [
      { label: "My Account" },
      {
        label: `My Reviews ${
          jobReviewRows.length ? `(${jobReviewRows.length})` : ""
        }`,
      },
      { label: "Settings" },
    ];
    return (
      <>
        {!isLoading ? (
          <Tabs
            tabs={tabLabels}
            currentTab={tabSelected}
            onSelectTab={(i: number) => {
              setTabSelected(i);
            }}
          />
        ) : null}
        <Spacer height={16} />
        {comps}
      </>
    );
  };

  return (
    <PageWrapper HeaderComponents={[renderHeader()]} Body={renderBody()} />
  );
};

export default UserPage;
