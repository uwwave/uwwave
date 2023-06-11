import Chip from "@mui/material/Chip";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { BackgroundColor } from "src/styles/color";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import {
  LocationText,
  Orientation,
} from "src/components/LocationText/LocationText";
import { JobTitleCell } from "src/components/JobsDataGrid/components/JobTitleCell";
import { ActionsCell } from "src/components/JobsDataGrid/components/ActionsCell";
import { IGetCompanyLogosResponse } from "src/lib/requests/Requests";
import { RatingsCell } from "src/components/JobsDataGrid/components/RatingCell";

interface IJobsDataGrid {
  jobKeywords: { [key: string]: string[] };
  jobs: JobsPageRowData[];
  loading?: boolean;
  companyLogos?: IGetCompanyLogosResponse;
}
export const JobsDataGrid = (props: IJobsDataGrid) => {
  const { jobKeywords, jobs, loading, companyLogos } = props;

  const [pageSize, setPageSize] = useState(10);

  const headerComponent = (
    headerData: GridColumnHeaderParams<any, JobsPageRowData>
  ) => (
    <strong style={{ fontSize: "0.84rem", color: BackgroundColor.darker }}>
      {headerData.colDef.headerName}
    </strong>
  );

  const columns: GridColDef<JobsPageRowData>[] = [
    {
      field: "companyName",
      headerName: "Company",
      renderHeader: headerComponent,
      renderCell: rowData => (
        <JobTitleCell
          company={rowData.row.companyName}
          jobID={rowData.id.toString()}
          jobName={rowData.row.jobName}
          imageURL={companyLogos?.companyNameToLogo[rowData.row.companyName]}
        />
      ),
      colSpan: 2,
    },
    {
      field: "jobName",
      headerName: "Job Title",
      renderHeader: headerComponent,
      renderCell: () => <></>,
      flex: 1,
    },
    {
      field: "keywords",
      headerName: "Keywords",
      sortable: false,
      renderHeader: headerComponent,
      renderCell: rowData => (
        <div style={{ margin: "2px" }}>
          {jobKeywords[rowData.row.id] &&
            jobKeywords[rowData.row.id].map(keyword => {
              return (
                <Chip
                  size="small"
                  label={`${keyword}`}
                  key={keyword}
                  sx={{
                    margin: "2px",
                  }}
                />
              );
            })}
        </div>
      ),
    },
    {
      field: "score",
      headerName: "Score",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: () => (
        <RatingsCell
          ratingPercentage={95}
          moneyPercentage={70}
          scorePercenatge={50}
        />
      ),
    },
    {
      field: "location",
      headerName: "Location",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => (
        <LocationText
          city={rowData.row.city}
          country={rowData.row.country}
          orientation={Orientation.vertical}
        />
      ),
    },
    {
      field: "openings",
      headerName: "Openings",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
    },
    {
      field: "appDeadline",
      headerName: "Deadline",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      sortComparator: (date1: string, date2: string) =>
        Date.parse(date1) - Date.parse(date2),
      renderCell: rowData => <>{rowData.row.appDeadline.split(",")[0]}</>,
    },

    {
      field: "shortlistAndApply",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      sortable: false,
      renderCell: rowData => (
        <ActionsCell jobID={rowData.id.toString()} selectedTags={[]} />
      ),
    },
  ];

  return (
    <Paper elevation={0}>
      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={jobs}
        columns={columns}
        pageSize={pageSize}
        loading={loading}
        disableColumnMenu
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 100]}
        pagination
        autoHeight
        rowHeight={96}
        disableSelectionOnClick
        sx={{
          ".MuiDataGrid-root, .MuiDataGrid-cell": {
            whiteSpace: "normal !important",
            wordWrap: "break-all !important",
            overflow: "visible !important",
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              m: 1,
            },
          "border": "none",
          ".MuiDataGrid-virtualScroller": {
            overflow: "visible !important",
          },
          ".MuiDataGrid-main": {
            overflow: "visible !important",
            zIndex: "1 !important",
          },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Paper>
  );
};
