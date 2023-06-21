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
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { JobScoreInfoModal } from "src/components/Modals/variants/JobScoreInfoModal";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { useCompanyPage } from "src/lib/hooks/useCompanyPage";
import { Typography } from "@mui/material";
import { Tabs } from "src/components/Tabs/Tabs";
import { ConfigTab } from "src/components/TabSections/ConfigTab";
import { CompanyJobsDataGrid } from "src/components/JobsDataGrid/variants/CompanyJobsDataGrid";
import { AddReviewButton } from "src/components/NavigationBar/AddReviewButton";

const DUMMY_RATING = "4.2";
const DUMMY_SALARY = "50-60";
const DUMMY_COMPAT_SCORE = "20%";

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
  } = useCompanyPage(companyID);
  const [submitDomainModal, setSubmitDomainModal] = useState(false);
  useEffect(() => {
    if (!companyInfo) {
      return;
    }
    document.title = companyInfo.companyName;
  }, [companyInfo]);

  const renderCompanyHeader = () => {
    if (isLoading || !companyID || !companyInfo) {
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
      <>
        <JobScoreInfoModal
          isOpen={infoModal}
          onClose={() => {
            setInfoModal(false);
          }}
          rating={DUMMY_RATING}
          salary={DUMMY_SALARY}
          score={DUMMY_COMPAT_SCORE}
        />
        <CompanyHeaderWrapper>
          <HelpButton
            onClick={() => {
              setInfoModal(true);
            }}
          >
            <HelpOutlineIcon />
          </HelpButton>
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
                setSubmitDomainModal(true);
              }}
            />
            <Spacer height={24} />
            {companyInfo ? (
              <ButtonsWrapper>
                <AddReviewButton company={companyInfo} />
              </ButtonsWrapper>
            ) : null}
          </div>
          <JobRatingCard
            rating={DUMMY_RATING}
            salary={DUMMY_SALARY}
            score={DUMMY_COMPAT_SCORE}
            ratingVal={!isLoading ? Math.random() * 100 : 0}
            salaryVal={!isLoading ? Math.random() * 100 : 0}
            scoreVal={!isLoading ? Math.random() * 100 : 0}
          />
        </CompanyHeaderWrapper>
      </>
    );
  };

  const renderBody = () => (
    <>
      {!isLoading ? (
        <Tabs
          tabs={[{ label: "Job Listings" }, { label: "Settings" }]}
          currentTab={tabSelected}
          onSelectTab={(i: number) => {
            setTabSelected(i);
          }}
        />
      ) : null}
      <Spacer height={16} />
      {tabSelected === 0 && companyInfo ? (
        <CompanyJobsDataGrid
          companyName={companyInfo.companyName}
          companyLogo={companyInfo.logo ?? "/logo-empty.png"}
        />
      ) : null}
      {tabSelected === 1 ? (
        <ConfigTab
          onClick={() => {
            setSubmitDomainModal(true);
          }}
          companyURL={companyInfo?.domain}
        />
      ) : null}
    </>
  );

  const renderCompanyDescription = () => (
    <Typography>{companyInfo?.description}</Typography>
  );

  const companyHeader = renderCompanyHeader();
  const headerComponents = companyInfo?.description
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

const HelpButton = styled(IconButton)`
  && {
    position: absolute;
    right: -72px;
    top: -8px;
    opacity: 0.6;
  }

  &&:hover {
    opacity: 1;
  }
`;
