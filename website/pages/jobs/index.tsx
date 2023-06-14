import React, { useEffect } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import { BackgroundColor } from "src/styles/color";
import { SearchBarJobsList } from "components/SearchBar/SearchBarJobsList";
import { JobsDataGrid } from "src/components/JobsDataGrid/JobsDataGrid";
import { useJobsList } from "src/lib/hooks/useJobsList";
import { JobsListPageHeader } from "src/components/Headers/JobsListPageHeader";
import Skeleton from "@mui/material/Skeleton";
import { GetServerSideProps, NextPage } from "next";
import { IGetCompanyLogosResponse } from "src/lib/requests/Requests";
import { getCompanyLogos } from "src/lib/server/companies/logos";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";

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
  const renderBody = () => (
    <>
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
    </>
  );
  return (
    <PageWrapper
      Header={
        <JobsListPageHeader
          lastScrapedMessage={dataAgeMessage}
          isStale={isStale}
          numJobs={numJobs}
          earliestDeadline={earliestDeadline}
          differentCountries={differentCountries}
          isLoading={isLoading}
        />
      }
      Body={renderBody()}
      lighterBackground
    />
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
