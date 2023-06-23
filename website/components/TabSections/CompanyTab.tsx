import React from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import Typography from "@mui/material/Typography";
import { JobPagePaper } from "src/components/Paper/JobPagePaper";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { CompanyJobsDataGrid } from "src/components/DataGrid/variants/CompanyJobsDataGrid";

interface ICompanyTab {
  company: ICompanyClearbitData;
}
export const CompanyTab = ({ company }: ICompanyTab) => {
  return (
    <>
      <JobPagePaper>
        <Typography variant="h4" color="white">
          <b>{`${company.companyName}`}</b>
        </Typography>
        {company.description ? (
          <>
            <Spacer height={16} />
            <Typography color="white">{company.description}</Typography>
          </>
        ) : null}
      </JobPagePaper>
      <Spacer height={1} />
      <JobPagePaper>
        <Typography variant="h5" color="white" align="center">
          <b>{`All Job Listings`}</b>
        </Typography>
        <Spacer height={16} />
        <CompanyJobsDataGrid
          companyName={company.companyName}
          companyLogo={company.logo ?? "/logo-empty"}
        />
      </JobPagePaper>
    </>
  );
};
