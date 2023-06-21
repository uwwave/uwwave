import Chip from "@mui/material/Chip";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridToolbar,
  GridOverlay,
} from "@mui/x-data-grid";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { BackgroundColor } from "src/styles/color";
import Paper from "@mui/material/Paper";
import {
  LocationText,
  Orientation,
} from "src/components/LocationText/LocationText";
import { JobTitleCell } from "src/components/JobsDataGrid/components/JobTitleCell";
import { ActionsCell } from "src/components/JobsDataGrid/components/ActionsCell";
import { IGetCompanyLogosResponse } from "src/lib/requests/Requests";
import { RatingsCell } from "src/components/JobsDataGrid/components/RatingCell";
import styled from "styled-components";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import { DeadlineCell } from "./components/DeadlineCell";
import { useJobsDataGrid } from "src/lib/hooks/UseJobsDataGrid";
import { LogoLoader } from "src/components/Loader/LogoLoader";

interface IJobsDataGrid {
  jobKeywords: { [key: string]: string[] };
  jobs: JobsPageRowData[];
  loading?: boolean;
  companyLogos?: IGetCompanyLogosResponse;
  minHeight?: number;
}
export const JobsDataGrid = (props: IJobsDataGrid) => {
  const { jobKeywords, jobs, loading, companyLogos, minHeight } = props;
  const { pageSize, setPageSize } = useJobsDataGrid();

  const headerComponent = (
    headerData: GridColumnHeaderParams<any, JobsPageRowData>
  ) => (
    <strong style={{ fontSize: "0.84rem", color: BackgroundColor.darker }}>
      {headerData.colDef.headerName}
    </strong>
  );

  const scoreHeaderComponent = (
    headerData: GridColumnHeaderParams<any, JobsPageRowData>
  ) => {
    switch (headerData.field) {
      case "ratingsScore":
        return <RatingIcon />;
      case "salaryScore":
        return <MoneyIcon />;
      case "compatibilityScore":
        return <ScoreIcon />;
      default:
        return null;
    }
  };

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
      flex: 7,
    },
    {
      field: "keywords",
      headerName: "Keywords",
      sortable: false,
      flex: 5,
      renderHeader: headerComponent,
      renderCell: rowData => (
        <PillsWrapper>
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
        </PillsWrapper>
      ),
    },
    {
      field: "ratingsScore",
      headerName: "R",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderHeader: scoreHeaderComponent,
      renderCell: rowData => (
        <RatingsCell
          ratingPercentage={rowData.row.ratingsScore}
          moneyPercentage={rowData.row.salaryScore}
          scorePercenatge={rowData.row.compatibilityScore}
        />
      ),
      colSpan: 3,
    },
    {
      field: "salaryScore",
      headerName: "S",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderHeader: scoreHeaderComponent,
      renderCell: () => <></>,
    },
    {
      field: "compatibilityScore",
      headerName: "C",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderHeader: scoreHeaderComponent,
      renderCell: () => <></>,
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
          province={rowData.row.province}
          country={rowData.row.country}
          orientation={Orientation.vertical}
        />
      ),
    },
    {
      field: "openings",
      headerName: "Spots",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      flex: 1,
    },
    {
      field: "appDeadline",
      headerName: "Due",
      align: "center",
      headerAlign: "center",
      flex: 1.3,
      renderHeader: headerComponent,
      sortComparator: (date1: string, date2: string) =>
        Date.parse(date1) - Date.parse(date2),
      renderCell: rowData => (
        <DeadlineCell dateString={rowData.row.appDeadline} />
      ),
    },

    {
      field: "shortlistAndApply",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      sortable: false,
      renderCell: rowData => (
        <ActionsCell jobID={rowData.id.toString()} pageSize={pageSize} />
      ),
    },
  ];

  return (
    <Main>
      <InnerPaper>
        <StyledGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={jobs}
          columns={columns}
          pageSize={pageSize}
          loading={loading}
          disableColumnMenu
          onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
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
            ".MuiDataGrid-columnHeader": {
              minWidth: "0px !important",
            },
          }}
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: CustomLoadingOverlay,
          }}
          minHeight={minHeight ?? 1000}
        />
      </InnerPaper>
    </Main>
  );
};

const CustomLoadingOverlay = () => (
  <GridOverlay>
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoLoader />
    </div>
  </GridOverlay>
);

const PillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Main = styled(Paper).attrs({
  elevation: 0,
})`
  overflow-x: hidden;
  overflow-y: visible;
  position: relative;
`;
const InnerPaper = styled.div`
  width: calc(100% + 76px);
`;

const generateTagMenuFix = (nthChild: number) => {
  return `.MuiDataGrid-row:nth-of-type(${nthChild}) > div:nth-child(7) > div:nth-child(1) > .tag-job-icon-button > .tags-menu-wrapper {
    transform: translateY(calc(-100% - 40px));
  }`;
};

interface IGrid {
  pageSize: number;
  minHeight: number;
}
const StyledGrid = styled(props => (
  <DataGrid {...props} loadingOverlay={<CustomLoadingOverlay />} />
))<IGrid>`
  && {
    min-height: ${props => props.minHeight}px;
  }
  .MuiDataGrid-columnHeader:nth-child(4),
  .MuiDataGrid-columnHeader:nth-child(5),
  .MuiDataGrid-columnHeader:nth-child(6) {
    width: 30px !important;
    max-width: 30px !important;
    min-width: 30px !important;
    overflow: visible;
    padding: 0 !important;
  }

  .MuiDataGrid-columnHeader:nth-child(4) .MuiDataGrid-columnSeparator,
  .MuiDataGrid-columnHeader:nth-child(5) .MuiDataGrid-columnSeparator {
    display: none;
  }
  .MuiDataGrid-columnHeader:nth-child(4) .MuiDataGrid-columnSeparator,
  .MuiDataGrid-columnHeader:nth-child(5) .MuiDataGrid-columnSeparator,
  .MuiDataGrid-columnHeader:nth-child(10) .MuiDataGrid-columnSeparator {
    display: none;
  }

  .MuiDataGrid-columnHeader:nth-child(6)
    .MuiDataGrid-columnHeaderDraggableContainer {
    z-index: 1;
  }

  .MuiDataGrid-columnHeader:nth-child(6) .MuiDataGrid-columnSeparator {
    z-index: 0;
  }

  .MuiDataGrid-cell--withRenderer:nth-child(3) {
    max-width: 90px !important;
    min-width: 90px !important;
    width: 90px !important;
  }

  .MuiDataGrid-footerContainer {
    padding-right: 76px;
  }

  .MuiDataGrid-cell:nth-child(2) {
    overflow: hidden !important;
    align-items: start !important;
    padding-top: 8px;
  }

  /*Last few tag menus should open from the bottom so it doesn't overflow*/
  ${props => generateTagMenuFix(props.pageSize)}
  ${props => generateTagMenuFix(props.pageSize - 1)}
  ${props => generateTagMenuFix(props.pageSize - 2)}
`;

const MoneyIcon = styled(AttachMoneyIcon)`
  && {
    fill: ${BackgroundColor.dark};
  }
`;

const RatingIcon = styled(StarIcon)`
  && {
    fill: ${BackgroundColor.dark};
  }
`;

const ScoreIcon = styled(SearchIcon)`
  && {
    fill: ${BackgroundColor.dark};
  }
`;
