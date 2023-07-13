import React, { useEffect, useState } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import {
  CompanyCard,
  LoadingCompanyCard,
} from "components/CompanyCard/CompanyCard";
import { Tabs } from "src/components/Tabs/Tabs";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { SpecificJobPageSection } from "src/components/SpecificJobPageSection/SpecificJobPageSection";
import { useRouter } from "next/router";
import { BackgroundColor, Color } from "src/styles/color";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { JobRatingCard } from "src/components/JobRatingCard/JobRatingCard";
import TodayIcon from "@mui/icons-material/Today";
import { JobInfoTile } from "src/components/JobInfoTile/JobInfoTile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { calculateDaysFromNow } from "src/lib/dates/dates";
import { useJobPage } from "src/lib/hooks/useJobPage";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { TagJobButton } from "src/components/Buttons/TagJobButton";
import { UploadDomainModal } from "src/components/Modals/variants/UploadDomainModal";
import { JobInfoFieldsCoop } from "src/lib/extension/jobKeys";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { CompanyTab } from "src/components/TabSections/CompanyTab";
import { ReviewsDataGrid } from "src/components/DataGrid/ReviewsDataGrid";
import { DataGridHeader } from "src/components/DataGrid/DataGridHeader";
import { ReviewsEmptyState } from "src/components/Empty/JobReviewsEmptyState";
import { Page } from "src/lib/types/page";
import { ShowMoreButton } from "src/components/Buttons/ShowMoreButton";
import { InterviewsDataGrid } from "src/components/DataGrid/InterviewsDataGrid";
import { salaryDisplay, starsDisplay } from "src/lib/reviews/summary";
import { JobsDataGrid } from "src/components/DataGrid/JobsDataGrid";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useUserContext } from "src/lib/context/User/UserContext";

const SpecificJobPage = () => {
  const router = useRouter();
  const jobID = router.query.jobID as string | undefined;
  const {
    imageURL,
    companyInfo,
    job,
    tabSelected,
    setTabSelected,
    jobInfo,
    isLoading,
    techIcons,
    companyURL,
    onClearbitData,
    company,
    user,
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    fetchReviews,
    myReviewsRows,
    interviewRows,
    interviewsAreLoading,
    interviewVoteState,
    interviewUpvote,
    interviewDownnvote,
    fetchInterviews,
    reviewsSummary,
    myInterviewsRows,
    recommendedDisplayJobs,
    recommendedJobLogos,
  } = useJobPage(jobID);
  const [submitDomainModal, setSubmitDomainModal] = useState(false);
  const { isLoggedIn } = useUserContext();
  const { open } = useLoginModalContext();
  useEffect(() => {
    if (!job) {
      return;
    }
    document.title = job.companyName;
  }, [job]);

  const renderCompanyHeader = () => {
    if (isLoading || !jobID) {
      return (
        <CompanyHeaderWrapper>
          <div>
            <LoadingCompanyCard />
            <Spacer height={24} />
            <ButtonsWrapper>
              <Skeleton variant="rounded" width={180} height={48} />
              <Spacer width={8} />
              <Skeleton variant="rounded" width={180} height={48} />
            </ButtonsWrapper>
          </div>
          <Skeleton variant="rounded" width={320} height={240} />
        </CompanyHeaderWrapper>
      );
    }
    return (
      <CompanyHeaderWrapper>
        <div>
          <CompanyCard
            imageURL={imageURL}
            companyName={companyInfo.companyName}
            city={companyInfo.city}
            province={companyInfo.province}
            country={companyInfo.country}
            positionTitle={companyInfo.positionTitle}
            companyURL={companyURL}
            onOpenSubmitDomain={() => {
              if (isLoggedIn) {
                setSubmitDomainModal(true);
              } else {
                open();
              }
            }}
            companyPageURL={company ? `/companies/${company.id}` : undefined}
          />
          <Spacer height={24} />
          <ButtonsWrapper>
            <a
              href={`https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm?ck_jobid=${jobID}`}
              target="_blank"
            >
              <PrimaryButton>Apply</PrimaryButton>
            </a>
            <Spacer width={8} />
            <TagJobButton jobID={jobID} />
          </ButtonsWrapper>
        </div>
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
      </CompanyHeaderWrapper>
    );
  };
  const renderCompanyFastFacts = () => {
    if (isLoading) {
      return (
        <JobFastFactsWrapperLoading>
          <Skeleton variant="rounded" width={"25%"} height={80} />
          <Skeleton variant="rounded" width={"25%"} height={80} />
          <Skeleton variant="rounded" width={"25%"} height={80} />
          <Skeleton variant="rounded" width={"25%"} height={80} />
        </JobFastFactsWrapperLoading>
      );
    }
    return (
      <JobFastFactsWrapper>
        {job?.appDeadline ? (
          <JobInfoTile
            icon={<TodayIcon />}
            title="Deadline"
            value={calculateDaysFromNow(new Date(job.appDeadline))}
            subValue={job.appDeadline}
          />
        ) : null}
        {job?.duration ? (
          <JobInfoTile
            icon={<ScheduleIcon />}
            title="Duration"
            value={job.duration}
          />
        ) : null}
        {job?.openings ? (
          <JobInfoTile
            icon={<PeopleIcon />}
            title="Spots"
            value={job.openings.toString()}
          />
        ) : null}

        {job?.compensationAndBenefitsInformation ? (
          <JobInfoTile
            icon={<PaidIcon />}
            title="Salary/Perks"
            value={job.compensationAndBenefitsInformation
              .replace(/<[^>]*>?/gm, "")
              .replace(/&nbsp;/g, "")}
          />
        ) : null}

        {job?.jobPostingInformation &&
        job?.jobPostingInformation[JobInfoFieldsCoop.jobAddressLineOne] ? (
          <JobInfoTile
            icon={<LocationCityIcon />}
            title="Address"
            value={
              job.jobPostingInformation[JobInfoFieldsCoop.jobAddressLineOne]
            }
            subValue={
              (job.jobPostingInformation[JobInfoFieldsCoop.jobAddressLineTwo]
                ? job.jobPostingInformation[
                    JobInfoFieldsCoop.jobAddressLineTwo
                  ] + ", "
                : "") +
              (job?.jobPostingInformation[JobInfoFieldsCoop.jobPostalCode] ??
                "")
            }
          />
        ) : null}
      </JobFastFactsWrapper>
    );
  };

  const Description = () => {
    if (isLoading) {
      return (
        <>
          <Spacer height={16} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={240}
            sx={{ bgcolor: BackgroundColor.dark }}
          />
          <Spacer height={16} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={240}
            sx={{ bgcolor: BackgroundColor.dark }}
          />
          <Spacer height={16} />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={240}
            sx={{ bgcolor: BackgroundColor.dark }}
          />
        </>
      );
    }
    return (
      <>
        {jobInfo.map((item: { title: string; text: string }) => {
          return (
            item.text && (
              <SpecificJobPageSection
                key={item.title}
                jobSectionTitle={item.title}
                jobSectionDescription={ReactHtmlParser(item.text) as any}
              />
            )
          );
        })}
        {(job?.jobPostingInformation || job?.applicationInformation) && (
          <ShowMoreButton
            extraJobInfo={{
              Location: job?.location,
              ...job?.jobPostingInformation,
              ...job?.applicationInformation,
            }}
          />
        )}
      </>
    );
  };
  const renderReviews = () => (
    <ReviewsDataGrid
      user={user}
      jobReviewRows={jobReviewRows}
      jobReviewsLoading={jobReviewsLoading}
      voteState={voteState}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onEditReview={fetchReviews}
      origin={Page.JOB_PAGE}
    />
  );

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
        origin={Page.JOB_PAGE}
      />
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
            origin={Page.JOB_PAGE}
          />
          <Spacer height={32} />
        </>
      ) : (
        <>
          <ReviewsEmptyState
            afterSubmit={fetchReviews}
            origin={Page.JOB_PAGE}
            title="You have 0 Job Reviews! Submit a review to share your experience:"
            company={company}
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
          company={company}
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

  const renderCompanyTab = () => {
    if (!company) {
      return null;
    }
    return <CompanyTab company={company} />;
  };

  const renderJobRecommendations = () => (
    <JobsDataGrid
      jobs={recommendedDisplayJobs}
      companyLogos={recommendedJobLogos}
      jobKeywords={{}}
    />
  );

  const renderJobBody = () => {
    const isLoggedIn = !!user;
    const detailsTab = { label: "Details" };
    const companyInfoTab = { label: "Company Info" };
    const reviewsTab = {
      label:
        jobReviewRows.length > 0
          ? `Reviews (${jobReviewRows.length})`
          : `Reviews`,
    };
    const interviewsTab = {
      label:
        interviewRows.length > 0
          ? `Interviews (${interviewRows.length})`
          : `Interviews`,
    };
    const myReviewsTab = {
      label:
        myReviewsRows.length + myInterviewsRows.length > 0
          ? `My Reviews (${myReviewsRows.length + myInterviewsRows.length})`
          : `My Reviews`,
    };

    const jobRecommendationsTab = recommendedDisplayJobs.length
      ? {
          label: `Similar Jobs (${recommendedDisplayJobs.length})`,
        }
      : null;

    const loggedInTabs = [
      detailsTab,
      companyInfoTab,
      reviewsTab,
      interviewsTab,
      myReviewsTab,
      ...(jobRecommendationsTab ? [jobRecommendationsTab] : []),
    ];

    const loggedOutTabs = [
      detailsTab,
      companyInfoTab,
      reviewsTab,
      interviewsTab,
      ...(jobRecommendationsTab ? [jobRecommendationsTab] : []),
    ];

    const tabs = isLoggedIn ? loggedInTabs : loggedOutTabs;
    return (
      <>
        {!isLoading ? (
          <Tabs
            tabs={tabs}
            currentTab={tabSelected}
            onSelectTab={(i: number) => {
              setTabSelected(i);
            }}
          />
        ) : null}
        <Spacer height={16} />
        {tabSelected === 0 ? <Description /> : null}
        {tabSelected === 1 ? renderCompanyTab() : null}
        {tabSelected === 2 ? renderReviews() : null}
        {tabSelected === 3 ? renderInterviews() : null}
        {tabSelected === 4 && isLoggedIn ? renderMyReviews() : null}
        {(tabSelected === 5 && isLoggedIn) || (tabSelected === 4 && !isLoggedIn)
          ? renderJobRecommendations()
          : null}
      </>
    );
  };

  const hideTechStack =
    techIcons.filter(x => x.icon !== undefined).length === 0 || isLoading;

  const renderTech = () => {
    if (hideTechStack) {
      return null;
    }
    return (
      <>
        <Spacer height={2} />
        <TechWrapper>
          <Typography color="gray">Tech Stack</Typography>
          {techIcons.map(icon => {
            if (icon.icon === undefined) {
              return null;
            }
            return (
              <TooltipWrapper
                title={<Typography>{icon.name}</Typography>}
                arrow
                key={icon.name}
                placement="top"
              >
                {icon.icon}
              </TooltipWrapper>
            );
          })}
        </TechWrapper>
      </>
    );
  };

  const renderSurvey = () => {
    return (
      <SurveyWrapper>
        <Typography>
          <b>
            Thanks for testing our first MVP! Please fill out our feedback
            survey next:
          </b>
        </Typography>
        <a href="https://forms.gle/cLkdDogx1fJ3QuTe7" target="_blank">
          <PrimaryButton>Open Survey</PrimaryButton>
        </a>
      </SurveyWrapper>
    );
  };
  const Tech = renderTech();
  const FastFacts = renderCompanyFastFacts();
  const nonHeaderComponents = Tech ? [FastFacts, Tech] : [FastFacts];
  return (
    <>
      {!isLoading ? (
        <UploadDomainModal
          companyName={companyInfo.companyName}
          isOpen={submitDomainModal}
          onClose={() => {
            setSubmitDomainModal(false);
          }}
          onClearbitCompanyData={onClearbitData}
          url={companyURL}
        />
      ) : null}

      <PageWrapper
        headerPadding={0}
        hideBackground
        HeaderComponents={[renderCompanyHeader(), ...nonHeaderComponents]}
        Body={renderJobBody()}
        BeforeFooter={renderSurvey()}
      />
    </>
  );
};

export default SpecificJobPage;

const SurveyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  background-color: white;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const JobFastFactsWrapper = styled(Paper).attrs({
  elevation: 0,
})`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 64px;
`;

const JobFastFactsWrapperLoading = styled(Paper).attrs({
  elevation: 0,
})`
  display: flex;
  gap: 8px;
`;

const TechWrapper = styled(Paper).attrs({
  elevation: 0,
})`
  display: flex;
  gap: 8px;
  align-items: center;
  filter: grayscale(0.5);
`;

const TooltipWrapper = styled(Tooltip)`
  cursor: pointer;
`;
