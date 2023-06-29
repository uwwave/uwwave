import React, { useEffect } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import { BackgroundColor } from "src/styles/color";
import { SearchBarJobsList } from "components/SearchBar/SearchBarJobsList";
import { JobsDataGrid } from "src/components/DataGrid/JobsDataGrid";
import { useJobsList } from "src/lib/hooks/useJobsList";
import { JobsListPageHeader } from "src/components/Headers/variants/JobsListPageHeader";
import Skeleton from "@mui/material/Skeleton";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { Typography } from "@mui/material";
import { FilterJobsList } from "src/components/Filters/FiltersJobsList";

const JobsListPage = () => {
  useEffect(() => {
    document.title = "Jobs List";
  }, []);

  const {
    displayJobs,
    isLoading: isLoadingState,
    jobKeywords,
    numJobs,
    setChips,
    setNumActiveChips,
    numActiveChips,
    earliestDeadline,
    differentCountries,
    logos,
  } = useJobsList();
  const isLoading = isLoadingState || !logos;
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
      <FilterJobsList />
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
      HeaderComponents={[
        <Typography variant="h3" align="center">
          <b>Jobs List</b>
        </Typography>,
        <JobsListPageHeader
          numJobs={numJobs}
          earliestDeadline={earliestDeadline}
          differentCountries={differentCountries}
          isLoading={isLoading}
        />,
      ]}
      Body={renderBody()}
      lighterBackground
    />
  );
};

export default JobsListPage;
