import React, { useEffect } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import { BackgroundColor } from "src/styles/color";
import { SearchBarJobsList } from "components/SearchBar/SearchBarJobsList";
import { JobsDataGrid } from "src/components/JobsDataGrid/JobsDataGrid";
import { Footer } from "src/components/Footer/Footer";
import { useJobsList } from "src/lib/hooks/useJobsList";
import { JobsListPageHeader } from "src/components/Headers/JobsListPageHeader";
import Skeleton from "@mui/material/Skeleton";
import { GetServerSideProps, NextPage } from "next";
import { IGetCompanyLogosResponse } from "src/lib/requests/Requests";
import { getCompanyLogos } from "src/lib/server/companies/logos";

interface PageProps {
  logos: IGetCompanyLogosResponse;
}
const JobsListPage: NextPage<PageProps> = ({ logos }) => {
  useEffect(() => {
    document.title = "Jobs List";
  }, []);

  const {
    displayJobs,
    isLoading,
    dataAgeMessage,
    isStale,
    jobKeywords,
    numJobs,
    setChips,
    setNumActiveChips,
    numActiveChips,
    earliestDeadline,
    differentCountries,
  } = useJobsList();

  return (
    <>
      <NavigationBar />
      <Container>
        <Spacer height={64} />
        <JobsListPageHeader
          lastScrapedMessage={dataAgeMessage}
          isStale={isStale}
          numJobs={numJobs}
          earliestDeadline={earliestDeadline}
          differentCountries={differentCountries}
          isLoading={isLoading}
        />
        <Spacer height={32} />
      </Container>
      <WaterWrapper>
        <Spacer height={64} />
        <Container>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: BackgroundColor.darker }}
              width={"100%"}
              height={88}
            />
          ) : (
            <SearchBarJobsList
              onSearchUpdated={setChips}
              setNumActiveChips={setNumActiveChips}
              numActiveChips={numActiveChips}
            />
          )}
          <Spacer height={16} />
          <JobsDataGrid
            jobs={displayJobs}
            loading={isLoading}
            jobKeywords={jobKeywords}
            companyLogos={logos}
          />
        </Container>
        <Spacer height={64} />
      </WaterWrapper>
      <Footer dark />
    </>
  );
};

export default JobsListPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const out = await getCompanyLogos();
  return {
    props: {
      logos: out,
    },
  };
};

const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${BackgroundColor.dark};
  min-height: 100vh;
`;
