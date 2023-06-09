import React, { useEffect, useState } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import {
  CompanyCard,
  LoadingCompanyCard,
} from "components/CompanyCard/CompanyCard";
import styled from "styled-components";
import { useRouter } from "next/router";
import { JobRatingCard } from "src/components/JobRatingCard/JobRatingCard";
import Skeleton from "@mui/material/Skeleton";
import { UploadDomainModal } from "src/components/Modals/variants/UploadDomainModal";
import { JobScoreInfoModal } from "src/components/Modals/variants/JobScoreInfoModal";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { useCompanyPage } from "src/lib/hooks/useCompanyPage";
import Typography from "@mui/material/Typography";
import { Tabs } from "src/components/Tabs/Tabs";
import { ConfigTab } from "src/components/TabSections/ConfigTab";
import { CompanyJobsDataGrid } from "src/components/DataGrid/variants/CompanyJobsDataGrid";
import { AddReviewButton } from "src/components/NavigationBar/AddReviewButton";
import { ReviewsDataGrid } from "src/components/DataGrid/ReviewsDataGrid";
import { DataGridHeader } from "src/components/DataGrid/DataGridHeader";
import { Color } from "src/styles/color";
import { Page } from "src/lib/types/page";
import { ReviewsEmptyState } from "src/components/Empty/JobReviewsEmptyState";
import { InterviewsDataGrid } from "src/components/DataGrid/InterviewsDataGrid";
import { salaryDisplay, starsDisplay } from "src/lib/reviews/summary";
import { useViewport } from "src/lib/hooks/useViewport";
import { Center } from "src/components/Center/Center";
import { isMobile as isMobileDevice } from "react-device-detect";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useUserContext } from "src/lib/context/User/UserContext";

const SpecificCompanyPage = () => {
  const router = useRouter();
  const companyID = router.query.companyID as string | undefined;
  const {
    companyInfo,
    isLoading,
    infoModal,
    setInfoModal,
    onClearbitData,
    tabSelected,
    setTabSelected,
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    myReviewsRows,
    fetchReviews,
    jobsCount,
    interviewRows,
    interviewsAreLoading,
    interviewVoteState,
    interviewUpvote,
    interviewDownnvote,
    fetchInterviews,
    myInterviewsRows,
    reviewsSummary,
  } = useCompanyPage(companyID);
  const [submitDomainModal, setSubmitDomainModal] = useState(false);
  const { isLoggedIn } = useUserContext();
  const { open } = useLoginModalContext();
  useEffect(() => {
    if (!companyInfo) {
      return;
    }
    document.title = companyInfo.companyName;
  }, [companyInfo]);

  const { isMobile, isViewportLoading } = useViewport();
  if (isViewportLoading) {
    return null;
  }

  const renderCompanyHeader = () => {
    if (isLoading || !companyID || !companyInfo) {
      return (
        <CompanyHeaderWrapper>
          <div>
            <LoadingCompanyCard />
            {isMobile ? null : <Spacer height={24} />}
            {isMobile ? null : (
              <ButtonsWrapper>
                <Skeleton variant="rounded" width={180} height={48} />
                <Spacer width={8} />
                <Skeleton variant="rounded" width={180} height={48} />
              </ButtonsWrapper>
            )}
          </div>
          {isMobile ? null : (
            <Skeleton variant="rounded" width={320} height={240} />
          )}
        </CompanyHeaderWrapper>
      );
    }
    return (
      <>
        <JobScoreInfoModal
          isOpen={infoModal}
          onClose={() => {
            setInfoModal(false);
          }}
          rating={starsDisplay(reviewsSummary?.ratingAverage)}
          salary={salaryDisplay(
            reviewsSummary?.minSalary,
            reviewsSummary?.maxSalary
          )}
          interview={starsDisplay(reviewsSummary?.interviewAverage)}
          percentileString={
            reviewsSummary?.salaryPercentile
              ? `Top ${(100 - reviewsSummary.salaryPercentile).toFixed(1)}%`
              : null
          }
        />
        <CompanyHeaderWrapper>
          <div>
            <CompanyCard
              imageURL={companyInfo.logo ?? "/logo-empty.png"}
              companyName={companyInfo.domain ?? "Domain"}
              city={companyInfo.geo?.city}
              province={companyInfo.geo?.stateCode}
              country={companyInfo.geo?.country}
              positionTitle={companyInfo.companyName}
              companyURL={companyInfo.domain}
              onOpenSubmitDomain={() => {
                if (isLoggedIn) {
                  setSubmitDomainModal(true);
                } else {
                  open();
                }
              }}
            />
            {isMobile ? null : <Spacer height={24} />}
            {companyInfo && !isMobile ? (
              <ButtonsWrapper>
                <AddReviewButton
                  company={companyInfo}
                  afterSubmit={fetchReviews}
                  origin={Page.COMPANY_PAGE}
                />
              </ButtonsWrapper>
            ) : null}
          </div>
          {isMobile ? null : jobRatingsCard}
        </CompanyHeaderWrapper>
      </>
    );
  };
  const renderMyReviews = () => {
    const renderReviewsTableBody = () =>
      myReviewsRows.length ? (
        <>
          <Spacer height={4} />
          <ReviewsDataGrid
            user={user}
            jobReviewRows={myReviewsRows}
            jobReviewsLoading={jobReviewsLoading}
            voteState={voteState}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            onEditReview={fetchReviews}
            origin={Page.COMPANY_PAGE}
          />
          <Spacer height={32} />
        </>
      ) : (
        <>
          <ReviewsEmptyState
            afterSubmit={fetchReviews}
            origin={Page.COMPANY_PAGE}
            title="You have 0 Job Reviews! Submit a review to share your experience:"
            company={companyInfo}
          />
          <Spacer height={32} />
        </>
      );

    const renderInterviewsTableBody = () =>
      myInterviewsRows.length ? (
        <>
          <Spacer height={4} />
          <InterviewsDataGrid
            user={user}
            reviewRows={myInterviewsRows}
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
          company={companyInfo}
        />
      );

    return (
      <>
        <DataGridHeader title="Job Reviews" color={Color.rating} />
        {renderReviewsTableBody()}
        <DataGridHeader title="Interview Reviews" color={Color.interview} />
        {renderInterviewsTableBody()}
      </>
    );
  };

  const renderSettings = () => (
    <ConfigTab
      onClick={() => {
        if (!isLoggedIn) {
          open();
        } else {
          setSubmitDomainModal(true);
        }
      }}
      companyURL={companyInfo?.domain}
    />
  );

  const renderReviews = () => (
    <ReviewsDataGrid
      user={user}
      jobReviewRows={jobReviewRows}
      jobReviewsLoading={jobReviewsLoading}
      voteState={voteState}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onEditReview={fetchReviews}
      origin={Page.COMPANY_PAGE}
    />
  );

  const jobRatingsCard = isLoading ? (
    <Skeleton width="100%" height={300} variant="rounded" />
  ) : (
    <>
      <JobRatingCard
        rating={starsDisplay(reviewsSummary?.ratingAverage)}
        salary={salaryDisplay(
          reviewsSummary?.minSalary,
          reviewsSummary?.maxSalary
        )}
        interview={starsDisplay(reviewsSummary?.interviewAverage)}
        ratingVal={reviewsSummary?.ratingAverage ?? null}
        salaryVal={reviewsSummary?.salaryPercentile ?? null}
        interviewVal={reviewsSummary?.interviewAverage ?? null}
      />
      {isMobile ? (
        <>
          <Spacer height={16} />
          <Center>
            <AddReviewButton
              company={companyInfo}
              afterSubmit={fetchReviews}
              origin={Page.COMPANY_PAGE}
            />
          </Center>{" "}
          <Spacer height={16} />
        </>
      ) : null}
    </>
  );

  const renderJobListings = () => {
    if (!companyInfo) {
      return null;
    }
    return (
      <CompanyJobsDataGrid
        companyName={companyInfo.companyName}
        companyLogo={companyInfo.logo ?? "/logo-empty.png"}
      />
    );
  };

  const renderInterviews = () => {
    return (
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
    );
  };
  const renderBody = () => {
    const desktopComps = user ? (
      <>
        {tabSelected === 0 ? renderJobListings() : null}
        {tabSelected === 1 ? renderReviews() : null}
        {tabSelected === 2 ? renderInterviews() : null}
        {tabSelected === 3 ? renderMyReviews() : null}
        {tabSelected === 4 ? renderSettings() : null}
      </>
    ) : (
      <>
        {tabSelected === 0 ? renderJobListings() : null}
        {tabSelected === 1 ? renderReviews() : null}
        {tabSelected === 2 ? renderInterviews() : null}
        {tabSelected === 3 ? renderSettings() : null}
      </>
    );
    const mobileComps = user ? (
      <>
        {tabSelected === 0 ? renderReviews() : null}
        {tabSelected === 1 ? renderInterviews() : null}
        {tabSelected === 2 ? renderMyReviews() : null}
        {tabSelected === 3 ? renderSettings() : null}
      </>
    ) : (
      <>
        {tabSelected === 0 ? renderReviews() : null}
        {tabSelected === 1 ? renderInterviews() : null}
        {tabSelected === 2 ? renderSettings() : null}
      </>
    );

    const comps = isMobileDevice ? mobileComps : desktopComps;

    const jobsLabel = {
      label: `Job Listings ${jobsCount ? `(${jobsCount})` : ""}`,
    };
    const ratingsLabel = {
      label: `Reviews  ${
        jobReviewRows.length ? `(${jobReviewRows.length})` : ""
      }`,
    };
    const myReviewsLabel = {
      label: `My Reviews  ${
        myReviewsRows.length + myInterviewsRows.length
          ? `(${myReviewsRows.length + myInterviewsRows.length})`
          : ""
      }`,
    };

    const interviewsLabel = {
      label: `Interviews  ${
        interviewRows.length ? `(${interviewRows.length})` : ""
      }`,
    };

    const tabLabels = user
      ? [
          jobsLabel,
          ratingsLabel,
          interviewsLabel,
          myReviewsLabel,
          { label: "Settings" },
        ]
      : [jobsLabel, ratingsLabel, interviewsLabel, { label: "Settings" }];

    const mobileTabs = tabLabels.slice(1);
    return (
      <>
        {!isLoading ? (
          <Tabs
            tabs={isMobileDevice ? mobileTabs : tabLabels}
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

  const renderCompanyDescription = () => (
    <Typography>{companyInfo?.description}</Typography>
  );

  const companyHeader = renderCompanyHeader();
  const headerComponents = isMobile
    ? companyInfo?.description
      ? [companyHeader, renderCompanyDescription(), jobRatingsCard]
      : [companyHeader, jobRatingsCard]
    : companyInfo?.description
    ? [companyHeader, renderCompanyDescription()]
    : [companyHeader];
  return (
    <>
      {!isLoading && companyInfo ? (
        <UploadDomainModal
          companyName={companyInfo.companyName}
          isOpen={submitDomainModal}
          onClose={() => {
            setSubmitDomainModal(false);
          }}
          onClearbitCompanyData={onClearbitData}
          url={companyInfo.domain}
        />
      ) : null}

      <PageWrapper
        headerPadding={0}
        hideBackground
        HeaderComponents={headerComponents}
        Body={renderBody()}
      />
    </>
  );
};

export default SpecificCompanyPage;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
`;
