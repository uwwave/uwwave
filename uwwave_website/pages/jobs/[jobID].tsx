import { useEffect, useMemo, useState } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
// import { SearchBar } from 'components/SearchBar/SearchBar'
import { CompanyCard } from "components/CompanyCard/CompanyCard";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "styled-components";
import axios from "axios";
import { buildCoopJobWithJobID } from "src/lib/jobsList/jobsList";
import ReactHtmlParser from "react-html-parser";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import { SpecificJobPageSection } from "src/components/SpecificJobPageSection/SpecificJobPageSection";
import { useRouter } from "next/router";
import { useExtensionData } from "src/lib/extension/hooks/useExtensionData";
import { Footer } from "src/components/Footer/Footer";
import { BackgroundColor } from "src/styles/color";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { SecondaryButton } from "src/components/Buttons/SecondaryButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { JobRatingCard } from "src/components/JobRatingCard/JobRatingCard";
import TodayIcon from "@mui/icons-material/Today";
import { JobInfoTile } from "src/components/JobInfoTile/JobInfoTile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { calculateDaysFromNow } from "src/lib/dates/dates";

type CompanyCard = {
  companyName: string;
  city: string;
  country: string;
  positionTitle: string;
};

type JobInfo = {
  title: string;
  text: string;
};

// jobInfo: { title: string; text: string }[]
// companyInfo: { imageURL: string; companyName: string; city: string; country:string; positionTitle: string }
// jobId: string
const SpecificJobPage = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState<string>("");
  const { jobID } = router.query;
  const { extensionData: jobs } = useExtensionData();

  const job = useMemo(
    () => buildCoopJobWithJobID(jobs, jobID as unknown as number),
    [jobs, jobID]
  );
  const [jobInfo, setJobInfo] = useState<JobInfo[]>([]);

  const [companyInfo, setCompanyInfo] = useState<CompanyCard>({
    companyName: "",
    city: "",
    country: "",
    positionTitle: "",
  });

  const [tabSelected, setTabSelected] = useState(0);
  const handleTabChange = (event: any, newTab: number) => {
    setTabSelected(newTab);
  };

  useEffect(() => {
    setJobInfo([
      {
        title: "Job Summary",
        text:
          job?.jobSummary.replace(
            /<\s*(?:table|tr)[^>]*>|<\/\s*(?:table|tr)\s*>/g,
            ""
          ) ?? "",
      },
      {
        title: "Job Responsibilities",
        text:
          job?.jobResponsibilities.replace(
            /<\s*(?:table|tr)[^>]*>|<\/\s*(?:table|tr)\s*>/g,
            ""
          ) ?? "",
      },
      {
        title: "Required Skills",
        text:
          job?.requiredSkills.replace(
            /<\s*(?:table|tr)[^>]*>|<\/\s*(?:table|tr)\s*>/g,
            ""
          ) ?? "",
      },
    ]);

    setCompanyInfo({
      companyName: job?.companyName ?? "",
      city: job?.city ?? "",
      country: job?.country ?? "",
      positionTitle: job?.jobName ?? "",
    });
  }, [job]);

  useEffect(() => {
    axios
      .get(
        `https://842gb0w279.execute-api.ca-central-1.amazonaws.com/items/${companyInfo.companyName}`
      )
      .then((res: any) => {
        if (res.data.Item) {
          setImageURL(res.data.Item.logo);

          const dashIndex = res.data.Item.salary.indexOf("-");
          let salary = `$${res.data.Item.salary}`;
          if (dashIndex >= 0)
            salary = `${salary.slice(0, dashIndex + 2)}$${salary.slice(
              dashIndex + 2
            )}`;
          if (res.data.Item.Currency) salary += ` ${res.data.Item.Currency}`;

          setJobInfo([
            ...jobInfo,
            {
              title: "Salary",
              text: salary,
            },
            {
              title: "Company Website",
              text: `<a href=//${res.data.Item.domain} target='_blank'>${res.data.Item.domain}</a>`,
            },
          ]);
        } else {
          setImageURL("/logo.png");
        }
      })
      .catch((err: any) => {
        console.error(err);
        setImageURL("/logo.png");
      });
  }, [companyInfo, jobInfo]);

  useEffect(() => {
    document.title = `Wave - ${job?.jobName}`;
  }, [job]);

  const renderCompanyHeader = () => (
    <CompanyHeaderWrapper>
      <div>
        <CompanyCard
          imageURL={imageURL}
          companyName={companyInfo.companyName}
          city={companyInfo.city}
          country={companyInfo.country}
          positionTitle={companyInfo.positionTitle}
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
          <SecondaryButton>
            <FavoriteBorderIcon sx={{ mr: 1 }} /> Favorite
          </SecondaryButton>
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

  const renderCompanyFastFacts = () => (
    <JobFastFactsWrapper>
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
          title="Openings"
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
      <JobInfoTile
        icon={<LocationCityIcon />}
        title="Address"
        value={"Address line 1"}
        subValue={"Maybe address line 2, POSTAL CODE"}
      />
    </JobFastFactsWrapper>
  );

  const Description = () => (
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

  const JobBody = () => (
    <div>
      <Spacer height={16} />
      {imageURL !== "" && (
        <Tabs
          TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          value={tabSelected}
          onChange={handleTabChange}
        >
          <StyledTab label="Details" />
        </Tabs>
      )}
      <Description />
    </div>
  );

  return (
    <>
      <NavigationBar />
      <Container>
        <Spacer height={48} />
        {renderCompanyHeader()}
        <Spacer height={32} />
        {renderCompanyFastFacts()}
        <Spacer height={32} />
      </Container>
      <WaterWrapper>
        <Container>
          <JobBody />
        </Container>
        <Spacer height={128} />
      </WaterWrapper>
      <Footer />
    </>
  );
};

export default SpecificJobPage;

const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${BackgroundColor.darker};
  min-height: 100vh;
`;

const StyledTab = styled(Tab)({
  "&.MuiTab-textColorPrimary": {
    color: "white",
  },
});

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobFastFactsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 64px;
`;
