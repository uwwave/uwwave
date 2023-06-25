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
import { InterviewsDataGrid } from "src/components/DataGrid/InterviewsDataGrid";
import { JobPagePaper } from "src/components/Paper/JobPagePaper";
import Typography from "@mui/material/Typography";
import { ProfileImageWithModal } from "src/components/HeaderCard/ProfileImage";
import { EditUsernameButton } from "src/components/Account/EditUsernameButton";
import { useViewport } from "src/lib/hooks/useViewport";

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
    interviewRows,
    interviewsAreLoading,
    interviewVoteState,
    interviewUpvote,
    interviewDownnvote,
    fetchInterviews,
  } = useUserPage();
  const { isMobile } = useViewport();
  const renderHeader = () => (
    <ProfileHeaderCard
      imageURL={getProfileImage(user?.profilePicture)}
      username={user?.username ?? ""}
      isLoading={isLoading}
      dateJoined={user?.dateJoined}
    />
  );

  const renderMyReviewsTabs = () => {
    const renderTableBody = () =>
      jobReviewRows.length ? (
        <>
          <Spacer height={4} />
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
        </>
      ) : (
        <ReviewsEmptyState
          afterSubmit={fetchReviews}
          origin={Page.PROFILE}
          title="You have 0 Job Reviews! Submit a review to share your experience:"
        />
      );

    const renderInterviewsTableBody = () =>
      interviewRows.length ? (
        <>
          <Spacer height={4} />
          <InterviewsDataGrid
            user={user}
            reviewRows={interviewRows}
            isLoading={interviewsAreLoading}
            voteState={interviewVoteState}
            onUpvote={interviewUpvote}
            onDownvote={interviewDownnvote}
            onEditReview={fetchInterviews}
            origin={Page.COMPANY_PAGE}
          />
        </>
      ) : (
        <ReviewsEmptyState
          afterSubmit={fetchReviews}
          origin={Page.COMPANY_PAGE}
          title="You have 0 Interview Reviews! Submit a review to share your experience:"
        />
      );
    return (
      <>
        <DataGridHeader title="Job Reviews" color={Color.rating} />
        {renderTableBody()}
        <Spacer height={32} />
        <DataGridHeader title="Interview Reviews" color={Color.interview} />
        {renderInterviewsTableBody()}
      </>
    );
  };

  const renderMyAccountTab = () => {
    return (
      <JobPagePaper>
        <Typography color="white" variant="h5">
          <b>My Profile</b>
        </Typography>
        <Spacer height={16} />
        <Typography color="white">Profile Image</Typography>
        <Spacer height={8} />
        <ProfileImageWithModal
          imageURL={getProfileImage(user?.profilePicture)}
          canEditPhoto
          showEditIcon
          width={isMobile ? 104 : undefined}
        />
        <Spacer height={16} />
        <Typography color="white">Username</Typography>
        <Spacer height={8} />
        <EditUsernameButton />
      </JobPagePaper>
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
    const comps = (
      <>
        {tabSelected === 0 ? renderMyAccountTab() : null}
        {tabSelected === 1 ? renderMyReviewsTabs() : null}
      </>
    );

    const tabLabels = [
      { label: "My Account" },
      {
        label: `My Reviews ${
          jobReviewRows.length + interviewRows.length
            ? `(${jobReviewRows.length + interviewRows.length})`
            : ""
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
