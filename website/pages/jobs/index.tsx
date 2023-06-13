import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import { BackgroundColor } from "src/styles/color";
import { WarningIcon } from "src/components/icons/WarningIcon";
import { CheckIcon } from "src/components/icons/CheckIcon";
import { SearchBarJobsList } from "components/SearchBar/SearchBarJobsList";
import { JobsDataGrid } from "src/components/JobsDataGrid/JobsDataGrid";
import { Footer } from "src/components/Footer/Footer";
// import { ExtensionRequests } from "src/lib/requests/ExtensionRequests";
import { useJobsList } from "src/lib/hooks/useJobsList";

export default function JobsListPage() {
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
    logos,
    setChips,
    setNumActiveChips,
    numActiveChips,
  } = useJobsList();

  return (
    <>
      <NavigationBar />
      <Container>
        <MainWrapper>
          <Spacer height={64} />
          <Typography fontWeight="bold" sx={{ fontSize: "24px" }}>
            Jobs List
          </Typography>
          <Spacer height={16} />
          {!isLoading ? <Typography>{numJobs} Listings</Typography> : null}

          <Spacer height={16} />
          {!!dataAgeMessage && (
            <StatusWrapper>
              <Typography>{dataAgeMessage} </Typography>
              {isStale ? <WarningIcon width={24} /> : <CheckIcon width={24} />}
            </StatusWrapper>
          )}
          <Spacer height={32} />
        </MainWrapper>
      </Container>
      <WaterWrapper>
        <Spacer height={32} />
        <Container>
          <SearchBarJobsList
            onSearchUpdated={setChips}
            setNumActiveChips={setNumActiveChips}
            numActiveChips={numActiveChips}
          />
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
}

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${BackgroundColor.dark};
  min-height: 100vh;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;
