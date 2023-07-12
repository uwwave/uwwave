import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridToolbar,
  GridOverlay,
  GridSortModel,
  GridSortDirection,
} from "@mui/x-data-grid";
import { BackgroundColor, Color } from "src/styles/color";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { LogoLoader } from "src/components/Loader/LogoLoader";
import {
  IJobReviewRow,
  IVotesState,
} from "src/lib/hooks/useCompanyReviewsDataGrid";
import { JobTitleCell, getJobTitleCellProps } from "./components/JobTitleCell";
import Typography from "@mui/material/Typography";
import { HelpfulCell } from "./components/HelpfullCell";
import { useState } from "react";
import { IUserData } from "src/database/models/UserData";
import moment from "moment";
import { EditReviewButton } from "./components/EditReviewButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Spacer } from "../Spacer/Spacer";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { Page } from "src/lib/types/page";
import { useViewport } from "src/lib/hooks/useViewport";
import { RatingsDisplay } from "../StarsInput/RatingsDisplay";
import { LocationText, Orientation } from "../LocationText/LocationText";
import { ReadMoreText } from "../ReadmoreText/ReadMoreTest";

interface IJobsDataGrid {
  jobReviewsLoading: boolean;
  voteState: IVotesState;
  onUpvote: (reviewID: string) => void;
  onDownvote: (reviewID: string) => void;
  user: IUserData | undefined;
  jobReviewRows: IJobReviewRow[];
  onEditReview: () => void;
  origin?: Page;
}

export const isDataMegathread = (data: { externalName?: string }): boolean => {
  return data.externalName
    ? data.externalName.toLowerCase().includes("megathread")
    : false;
};
export const ReviewsDataGrid = (props: IJobsDataGrid) => {
  const {
    jobReviewRows,
    jobReviewsLoading,
    voteState,
    onUpvote,
    onDownvote,
    user,
    onEditReview,
    origin,
  } = props;
  const router = useRouter();
  const [pageSize, setPageSize] = useState(5);
  const { isMobile } = useViewport();
  const page: Page =
    origin !== undefined
      ? origin
      : router.pathname === "/companies/[companyID]"
      ? Page.COMPANY_PAGE
      : Page.ANY;

  const headerComponent = (
    headerData: GridColumnHeaderParams<any, IJobReviewRow>
  ) => (
    <strong style={{ fontSize: "0.84rem", color: BackgroundColor.darker }}>
      {headerData.colDef.headerName}
    </strong>
  );

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "date",
      sort: "desc" as GridSortDirection,
    },
  ]);
  const mobileColumns: GridColDef<IJobReviewRow>[] = [
    {
      flex: 100,
      field: "date",
      renderHeader: () => null,
      renderCell: rowData => {
        const date = new Date(rowData.row.date);
        const formattedDate = moment(date).format("MMMM D, YYYY");
        const { title, imageURL, subtitle, url } = getJobTitleCellProps(
          rowData.row,
          page
        );
        const isMine = user?.id === rowData.row.user.id;
        const state = voteState[rowData.row.id];
        const location = rowData.row.location;
        const country = location
          ? location.startsWith("Remote in")
            ? location.split("in ")[1]
            : location.split(", ")[location.split(", ").length - 1]
          : undefined;
        const city = location
          ? location.startsWith("Remote in")
            ? "Remote"
            : location.split(", ")[0]
          : undefined;
        if (!state) {
          return null;
        }
        return (
          <div>
            <JobTitleCell
              subtitle={subtitle}
              title={title}
              imageURL={imageURL}
              url={url}
            />

            <div>
              <Spacer height={8} />
              {isDataMegathread(rowData.row) ? null : (
                <Typography>{`$${rowData.row.salary} CAD, hourly`}</Typography>
              )}
              {!isDataMegathread(rowData.row) ? null : rowData.row.minSalary &&
                rowData.row.maxSalary &&
                rowData.row.minSalary !== rowData.row.maxSalary ? (
                <Typography>{`$${rowData.row.minSalary} - $${rowData.row.maxSalary} CAD, hourly`}</Typography>
              ) : (
                <Typography>{`$${rowData.row.salary} CAD, hourly`}</Typography>
              )}
              <Spacer width={4} />
              {isDataMegathread(rowData.row) ? null : (
                <>
                  <LocationText
                    city={city}
                    country={country}
                    orientation={Orientation.horizontal}
                  />
                  <Spacer width={8} />
                </>
              )}

              {rowData.row.mentorshipRating &&
              rowData.row.workLifeRating &&
              rowData.row.meaningfulRating ? (
                <>
                  <RatingsDisplay
                    mentorshipVal={rowData.row.mentorshipRating / 20}
                    workLifeVal={rowData.row.workLifeRating / 20}
                    meaningfulVal={rowData.row.meaningfulRating / 20}
                  />
                  <Spacer height={16} />
                </>
              ) : null}
              <Typography>
                {rowData.row.verified ? (
                  <StyledTooltip title="Verified Review" arrow placement="top">
                    <StyledVerifiedIcon />
                  </StyledTooltip>
                ) : null}
                <b>
                  <ReadMoreText text={rowData.row.review ?? ""} max={120} />
                </b>
              </Typography>
            </div>
            <Spacer height={8} />
            <Typography>{formattedDate}</Typography>

            <Spacer height={8} />
            <div>
              {isMine ? (
                <EditReviewButton
                  review={rowData.row}
                  onClose={onEditReview}
                  origin={page}
                />
              ) : null}
              <HelpfulCell
                voteState={state.voteType}
                upvoteCount={state.upvotes}
                downvoteCount={state.downvotes}
                reviewID={rowData.row.id}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
                disabled={isMine}
              />
            </div>
          </div>
        );
      },
    },
  ];
  const columns: GridColDef<IJobReviewRow>[] = [
    {
      field: "userName",
      headerName: "Username",
      renderHeader: headerComponent,
      colSpan: 2,
      renderCell: rowData => {
        const { title, imageURL, subtitle, url } = getJobTitleCellProps(
          rowData.row,
          page
        );
        return (
          <JobTitleCell
            subtitle={subtitle}
            title={title}
            imageURL={imageURL}
            url={url}
          />
        );
      },
    },
    {
      field: "roleName",
      headerName: "Position",
      renderHeader: headerComponent,
      renderCell: () => <></>,
      flex: 3,
    },
    {
      flex: 4,
      field: "totalRating",
      headerName: "Review",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        return (
          <div>
            {rowData.row.mentorshipRating &&
            rowData.row.workLifeRating &&
            rowData.row.meaningfulRating ? (
              <>
                <RatingsDisplay
                  mentorshipVal={rowData.row.mentorshipRating / 20}
                  workLifeVal={rowData.row.workLifeRating / 20}
                  meaningfulVal={rowData.row.meaningfulRating / 20}
                />
                <Spacer height={16} />
              </>
            ) : null}
            <Typography>
              {rowData.row.verified ? (
                <StyledTooltip title="Verified Review" arrow placement="top">
                  <StyledVerifiedIcon />
                </StyledTooltip>
              ) : null}
              <b>
                <ReadMoreText text={rowData.row.review ?? ""} max={120} />
              </b>
            </Typography>
          </div>
        );
      },
    },
    {
      field: "salary",
      headerName: "Salary",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        const isMegathread = isDataMegathread(rowData.row);
        if (isMegathread) {
          return (
            <div>
              <Typography align="center">
                {rowData.row.minSalary &&
                rowData.row.maxSalary &&
                rowData.row.minSalary !== rowData.row.maxSalary
                  ? `$${rowData.row.minSalary} - $${rowData.row.maxSalary}`
                  : `$${rowData.row.salary}`}
              </Typography>
              <Typography align="center" variant="caption">
                CAD, hourly
              </Typography>
            </div>
          );
        }
        return (
          <div>
            <Typography align="center">{`$${rowData.row.salary}`}</Typography>
            <Typography align="center" variant="caption">
              CAD, hourly
            </Typography>
          </div>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        if (isDataMegathread(rowData.row)) {
          return null;
        }
        const location = rowData.row.location;
        const country = location
          ? location.startsWith("Remote in")
            ? location.split("in ")[1]
            : location.split(", ")[location.split(", ").length - 1]
          : undefined;
        const city = location
          ? location.startsWith("Remote in")
            ? "Remote"
            : location.split(", ")[0]
          : undefined;
        return (
          <LocationText
            city={city}
            country={country}
            orientation={Orientation.vertical}
          />
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        const date = new Date(rowData.row.date);
        const formattedDate = moment(date).format("MMM D");
        const formattedYear = moment(date).format("YYYY");
        return (
          <div>
            <Typography variant="subtitle2" align="center">
              {formattedDate}
            </Typography>
            <Typography variant="subtitle2" align="center">
              {formattedYear}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "upvotedCount",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        const state = voteState[rowData.row.id];
        if (!state) {
          return null;
        }
        const isMine = user?.id === rowData.row.user.id;
        return (
          <div>
            {isMine ? (
              <EditReviewButton
                review={rowData.row}
                onClose={onEditReview}
                origin={page}
              />
            ) : null}
            <HelpfulCell
              voteState={state.voteType}
              upvoteCount={state.upvotes}
              downvoteCount={state.downvotes}
              reviewID={rowData.row.id}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              disabled={isMine}
            />
          </div>
        );
      },
      sortable: false,
    },
  ];

  return (
    <Main>
      <StyledGrid
        isMobile={isMobile}
        sortModel={sortModel}
        onSortModelChange={(model: any) => setSortModel(model)}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={jobReviewRows}
        columns={isMobile ? mobileColumns : columns}
        pageSize={pageSize}
        loading={jobReviewsLoading}
        disableColumnMenu
        onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 100]}
        pagination
        autoHeight
        getRowHeight={() => "auto"}
        disableSelectionOnClick
        sx={{
          ".MuiDataGrid-root, .MuiDataGrid-cell": {
            whiteSpace: "normal !important",
            wordWrap: "break-all !important",
            overflow: "visible !important",
            p: 1,
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
      />
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

const Main = styled(Paper).attrs({
  elevation: 0,
})`
  overflow-x: hidden;
  overflow-y: visible;
  position: relative;
`;

interface IGrid {
  pageSize: number;
  minHeight: number;
  isMobile: boolean;
}
const StyledGrid = styled(props => (
  <DataGrid {...props} loadingOverlay={<CustomLoadingOverlay />} />
))<IGrid>`
  ${props =>
    props.isMobile
      ? `&& .MuiDataGrid-columnHeaders{
      display: none;
    }`
      : ""}
  ${props =>
    props.isMobile
      ? `&& .MuiDataGrid-virtualScroller{
      margin-top: 0!important;
    }`
      : ""}

  ${props =>
    props.isMobile
      ? `&& .MuiDataGrid-cell{
      min-width: 100% !important;
      width: 100% !important;
      justify-content: start;
    }`
      : ""}
  
  ${props =>
    props.isMobile
      ? `&& .MuiDataGrid-row{
      min-width: 100% !important;
      width: 100% !important;
    }`
      : ""}
`;

const StyledVerifiedIcon = styled(VerifiedIcon).attrs({
  fontSize: "small",
})`
  && {
    transform: translateY(4px);
    margin-right: 4px;
    color: ${Color.primaryButton};
  }
`;
const StyledTooltip = styled(Tooltip)`
  && {
    cursor: pointer;
  }
`;
