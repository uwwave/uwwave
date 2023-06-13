import React, { useEffect, useState } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import {
  CompanyCard,
  LoadingCompanyCard,
} from "components/CompanyCard/CompanyCard";
import Container from "@mui/material/Container";
import { Tabs } from "src/components/Tabs/Tabs";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import { SpecificJobPageSection } from "src/components/SpecificJobPageSection/SpecificJobPageSection";
import { useRouter } from "next/router";
import { Footer } from "src/components/Footer/Footer";
import { BackgroundColor } from "src/styles/color";
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
import { JobPagePaper } from "src/components/Paper/JobPagePaper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { JobInfoFieldsCoop } from "src/lib/extension/jobKeys";
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
  } = useJobPage(jobID);
  const [submitDomainModal, setSubmitDomainModal] = useState(false);
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
            country={companyInfo.country}
            positionTitle={companyInfo.positionTitle}
            companyURL={companyURL}
            onOpenSubmitDomain={() => {
              setSubmitDomainModal(true);
            }}
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
          rating="4.2"
          salary="50-60"
          score="10%"
          ratingVal={job ? Math.random() * 100 : 0}
          salaryVal={job ? Math.random() * 100 : 0}
          scoreVal={job ? Math.random() * 100 : 0}
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
      <JobFastFactsWrapper bottomPadding={hideTechStack}>
        {job?.appDeadline ? (
          <JobInfoTile
            icon={<TodayIcon />}
            title="Deadline"
            value={calculateDaysFromNow(new Date(job.appDeadline))}
            subValue={job.appDeadline}
          />
        ) : null}
        {job?.appDeadline ? (
          <JobInfoTile
            icon={<ScheduleIcon />}
            title="Duration"
            value={"4 months"}
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
            value={job.compensationAndBenefitsInformation}
          />
        ) : null}

        {job?.jobPostingInformation[JobInfoFieldsCoop.jobAddressLineOne] ? (
          <JobInfoTile
            icon={<LocationCityIcon />}
            title="Address"
            value={
              job.jobPostingInformation[JobInfoFieldsCoop.jobAddressLineOne]
            }
            subValue={
              (job?.jobPostingInformation[JobInfoFieldsCoop.jobAddressLineTwo] +
                ", " ?? "") +
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
      </>
    );
  };

  const renderConfigTab = () => {
    return (
      <JobPagePaper>
        <Typography variant="h5" color="white">
          Settings
        </Typography>
        <Spacer height={32} />
        <DomainSettingsWrapper>
          <Typography color="white">
            <b>Domain:</b>
          </Typography>
          <Spacer width={8} />
          <Typography color="white">{companyURL}</Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              setSubmitDomainModal(true);
            }}
          >
            <EditIcon color="inherit" />
          </IconButton>
        </DomainSettingsWrapper>
      </JobPagePaper>
    );
  };
  const renderJobBody = () => (
    <>
      <Spacer height={16} />
      {!isLoading ? (
        <Tabs
          tabs={[{ label: "Details" }, { label: "Settings" }]}
          currentTab={tabSelected}
          onSelectTab={(i: number) => {
            setTabSelected(i);
          }}
        />
      ) : null}
      <Spacer height={16} />
      {tabSelected === 0 ? <Description /> : null}
      {tabSelected === 1 ? renderConfigTab() : null}
    </>
  );

  const hideTechStack =
    techIcons.filter(x => x.icon !== undefined).length === 0 || isLoading;

  const renderTech = () => {
    if (hideTechStack) {
      return null;
    }
    return (
      <>
        <Spacer height={2} />
        <TechWrapper bottomPadding>
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

  return (
    <Main>
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

      <NavigationBar backgroundColor="white" />
      <Container>
        <Spacer height={40} />
        {renderCompanyHeader()}
        <Spacer height={2} />
        {renderCompanyFastFacts()}
        {renderTech()}
      </Container>
      <Shadow />
      <WaterWrapper>
        <Container>{renderJobBody()}</Container>
        <Spacer height={128} />
      </WaterWrapper>
      {renderSurvey()}
      <Footer />
    </Main>
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
const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${BackgroundColor.darker};
  min-height: 100vh;
  z-index: 1;
  position: relative;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyHeaderWrapper = styled(Paper).attrs({
  elevation: 0,
})`
  display: flex;
  justify-content: space-between;
  padding: 32px;
`;

const JobFastFactsWrapper = styled(Paper).attrs({
  elevation: 0,
})<IBottomPadding>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 64px;
  padding: 32px;
  ${props => (props.bottomPadding ? "padding-bottom: 64px;" : "")}
`;

const JobFastFactsWrapperLoading = styled(Paper).attrs({
  elevation: 0,
})`
  display: flex;
  gap: 8px;
  padding: 32px;
  padding-bottom: 64px;
`;

interface IBottomPadding {
  bottomPadding: boolean;
}
const TechWrapper = styled(Paper).attrs({
  elevation: 0,
})<IBottomPadding>`
  display: flex;
  padding: 16px;
  ${props => (props.bottomPadding ? "padding-bottom: 56px;" : "")}
  gap: 8px;
  align-items: center;
  padding-left: 32px;
  filter: grayscale(0.5);
`;

const Main = styled.div`
  background-color: ${BackgroundColor.offWhite};
`;

const Shadow = styled.div`
  margin-top: -32px;
  z-index: 1;
  position: relative;
  height: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 21.88%,
    rgba(139, 139, 139, 0.88) 100%
  );
`;

const TooltipWrapper = styled(Tooltip)`
  cursor: pointer;
`;

const DomainSettingsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
