import { useCompanyJobsDataGrid } from "src/lib/hooks/useCompanyJobsDataGrid";
import { JobsDataGrid } from "../JobsDataGrid";

interface ICompanyJobsDataGrid {
  companyName: string;
  companyLogo: string;
}
export const CompanyJobsDataGrid = ({
  companyName,
  companyLogo,
}: ICompanyJobsDataGrid) => {
  const { isLoading, displayJobs, logos, jobKeywords } = useCompanyJobsDataGrid(
    companyName,
    companyLogo
  );
  return (
    <JobsDataGrid
      loading={isLoading}
      jobs={displayJobs}
      companyLogos={logos}
      jobKeywords={jobKeywords}
      minHeight={1000}
    />
  );
};
