import Chip from "@mui/material/Chip";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { BackgroundColor, Color } from "src/styles/color";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { LocationText, Orientation } from "../LocationText/LocationText";

interface IJobsDataGrid {
  jobKeywords: { [key: string]: string[] };
  jobs: JobsPageRowData[];
  loading?: boolean;
  onToggleBookmark: (id: number) => void;
}
export const JobsDataGrid = (props: IJobsDataGrid) => {
  const { jobKeywords, jobs, loading } = props;

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
      flex: 1,
      renderHeader: headerComponent,
      renderCell: rowData => (
        <div style={{ margin: "2px" }}>
          {rowData.row.companyName}
          <br />
          <div style={{ color: "grey", fontSize: "0.7rem" }}>
            {rowData.row.division}
            <br />
          </div>
        </div>
      ),
    },
    {
      field: "jobName",
      headerName: "Job Title",
      flex: 1,
      renderHeader: headerComponent,
      renderCell: rowData => (
        <StyledA href={`/jobs/${rowData.id}`} target="_blank">
          {rowData.row.jobName}
        </StyledA>
      ),
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
        <ActionsWrapper>
          <IconButton>
            <StyledBookmarkBorderIcon />
          </IconButton>
          <StyledA
            href={`https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm?ck_jobid=${rowData.id}`}
            target="_blank"
          >
            <IconButton>
              <OpenInNewIcon />
            </IconButton>
          </StyledA>
        </ActionsWrapper>
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
        rowHeight={100}
        disableSelectionOnClick
        sx={{
          ".MuiDataGrid-root, .MuiDataGrid-cell": {
            whiteSpace: "normal !important",
            wordWrap: "break-all !important",
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              m: 1,
            },
          "border": "none",
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Paper>
  );
};

const StyledA = styled.a`
  && button svg {
    color: ${Color.primaryButton};
  }
  color: ${Color.primaryButton};
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBookmarkBorderIcon = styled(BookmarkBorderIcon)`
  && {
    color: ${BackgroundColor.darker};
  }
`;
