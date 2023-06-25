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
import { IVotesState } from "src/lib/hooks/useCompanyReviewsDataGrid";
import { JobTitleCell, getJobTitleCellProps } from "./components/JobTitleCell";
import { StarsInput } from "../StarsInput/StarsInput";
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
import { IInterviewReviewRow } from "src/lib/hooks/useInterviewReviewsDataGrid";
import { ResourcesCell } from "./components/ResourcesCell";
import { useViewport } from "src/lib/hooks/useViewport";

interface IJobsDataGrid {
  isLoading: boolean;
  voteState: IVotesState;
  onUpvote: (reviewID: string) => void;
  onDownvote: (reviewID: string) => void;
  user: IUserData | undefined;
  reviewRows: IInterviewReviewRow[];
  onEditReview: () => void;
  origin?: Page;
}
export const InterviewsDataGrid = (props: IJobsDataGrid) => {
  const {
    reviewRows,
    isLoading,
    voteState,
    onUpvote,
    onDownvote,
    user,
    onEditReview,
    origin,
  } = props;
  const router = useRouter();
  const { isMobile } = useViewport();
  const [pageSize, setPageSize] = useState(10);
  const page: Page =
    origin !== undefined
      ? origin
      : router.pathname === "/companies/[companyID]"
      ? Page.COMPANY_PAGE
      : Page.ANY;

  const headerComponent = (
    headerData: GridColumnHeaderParams<any, IInterviewReviewRow>
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

  const mobileColumns: GridColDef<IInterviewReviewRow>[] = [
    {
      flex: 1,
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
            <Spacer height={8} />
            <Typography variant="caption">{formattedDate}</Typography>
            <Spacer height={8} />
            <MobileRow>
              <Typography>Difficulty</Typography>
              <StarsInput
                color={isMine ? BackgroundColor.dark : Color.interview}
                value={rowData.row.difficulty / 20}
                starsSize={28}
              />
            </MobileRow>

            <div>
              <Spacer height={8} />
              <Typography>
                {rowData.row.verified ? (
                  <StyledTooltip title="Verified Review" arrow placement="top">
                    <StyledVerifiedIcon />
                  </StyledTooltip>
                ) : null}
                <b>{rowData.row.status.split("_").join(" ")}</b>
                {` - ${rowData.row.review}`}
              </Typography>
            </div>
            <Spacer height={8} />
            <Typography>Resources</Typography>
            <ResourcesCell resources={rowData.row.resources} />
            <Spacer height={32} />
            <div>
              {isMine ? (
                <EditReviewButton
                  interview={rowData.row}
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
                color={Color.interview}
              />
            </div>
          </div>
        );
      },
    },
  ];
  const columns: GridColDef<IInterviewReviewRow>[] = [
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
      flex: 1,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        const isMine = user?.id === rowData.row.user.id;
        return (
          <StarsInput
            color={isMine ? BackgroundColor.dark : Color.interview}
            value={rowData.row.difficulty / 20}
            starsSize={16}
          />
        );
      },
    },
    {
      flex: 3,
      field: "status",
      headerName: "Review",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        return (
          <>
            <Spacer width={16} />
            <Typography>
              {rowData.row.verified ? (
                <StyledTooltip title="Verified Review" arrow placement="top">
                  <StyledVerifiedIcon />
                </StyledTooltip>
              ) : null}
              <b>{rowData.row.status.split("_").join(" ")}</b>
              {` - ${rowData.row.review}`}
            </Typography>
          </>
        );
      },
    },
    {
      flex: 1,
      field: "resources",
      headerName: "Resources",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        return <ResourcesCell resources={rowData.row.resources} />;
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
        const formattedDate = moment(date).format("MMMM D");
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
                interview={rowData.row}
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
              color={Color.interview}
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
        rows={reviewRows}
        columns={isMobile ? mobileColumns : columns}
        pageSize={pageSize}
        loading={isLoading}
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

const MobileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
