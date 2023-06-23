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
import { JobTitleCell } from "./components/JobTitleCell";
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
import { getProfileImage } from "src/lib/types/profiles";

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
  const [pageSize, setPageSize] = useState(10);
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
  const columns: GridColDef<IJobReviewRow>[] = [
    {
      field: "userName",
      headerName: "Username",
      renderHeader: headerComponent,
      colSpan: 2,
      renderCell: rowData => {
        const user = rowData.row.user;
        const isProfilePage = page === Page.PROFILE;
        //TITLE
        const companyPageTitle = rowData.row.anonymous
          ? "Anonymous"
          : rowData.row.user.username;
        const profilePageTitle = rowData.row.company.companyName;
        const title = isProfilePage ? profilePageTitle : companyPageTitle;
        //PROFILE IMAGE
        const companyPageImage = getProfileImage(user?.profilePicture);
        const profilePageImage = rowData.row.company.logo ?? "/logo-empty.png";
        const imageURL =
          page === Page.PROFILE ? profilePageImage : companyPageImage;
        //SUBTITLE
        const companyPageSubtitle = rowData.row.anonymous
          ? ""
          : rowData.row.role.role;
        const profilePageSubtitle = rowData.row.anonymous
          ? "anonymous"
          : rowData.row.role.role;
        const subtitle = isProfilePage
          ? profilePageSubtitle
          : companyPageSubtitle;
        //URL
        const companyPageURL = undefined;
        const profilePageURL = `/companies/${rowData.row.company.id}`;
        const url = isProfilePage ? profilePageURL : companyPageURL;
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
      field: "rating",
      headerName: "Rating",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => {
        const isMine = user?.id === rowData.row.user.id;
        return (
          <StarsInput
            color={isMine ? BackgroundColor.dark : Color.rating}
            value={rowData.row.rating / 20}
            starsSize={16}
          />
        );
      },
    },
    {
      field: "salary",
      headerName: "Salary",
      align: "center",
      headerAlign: "center",
      renderHeader: headerComponent,
      renderCell: rowData => (
        <div>
          <Typography align="center">{`$${rowData.row.salary}`}</Typography>
          <Typography align="center" variant="caption">
            CAD, hourly
          </Typography>
        </div>
      ),
    },
    {
      flex: 3,
      field: "review",
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

              {rowData.row.review}
            </Typography>
          </>
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
        sortModel={sortModel}
        onSortModelChange={(model: any) => setSortModel(model)}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={jobReviewRows}
        columns={columns}
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
}
const StyledGrid = styled(props => (
  <DataGrid {...props} loadingOverlay={<CustomLoadingOverlay />} />
))<IGrid>``;

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
