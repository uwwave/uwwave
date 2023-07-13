import { Color } from "src/styles/color";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { ProfilePicture, getProfileImage } from "src/lib/types/profiles";
import { Page } from "src/lib/types/page";
import { coopNumberSubtitleDisplay } from "src/lib/reviews/summary";
import { useViewport } from "src/lib/hooks/useViewport";
import { isDataMegathread } from "../ReviewsDataGrid";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IJobRole } from "src/database/models/JobRole";
import { IUserData } from "src/database/models/UserData";

interface IJobTitleCell {
  subtitle: string;
  title: string;
  url?: string;
  imageURL?: string;
}
export interface IData {
  user: IUserData | null;
  anonymous?: boolean;
  company: ICompanyClearbitData | null;
  role: IJobRole | null;
  coopNumber?: number;
  externalURL?: string;
  externalName?: string;
  title?: string;
  jobTerm?: string;
}

export const getJobTitleCellProps = (rowData: IData, page?: Page) => {
  if (rowData.externalName && rowData.externalName) {
    const isMegathread = isDataMegathread(rowData);
    return {
      title: isMegathread
        ? rowData.externalName
        : rowData.title ?? "External Review",
      imageURL: isMegathread ? "/reddit.png" : "/link.png",
      subtitle: isMegathread
        ? "Reddit submissions from r/uwaterloo"
        : rowData.externalName,
      url: rowData.externalURL,
    };
  }

  const user = rowData.user;
  const isProfilePage = page === Page.PROFILE;
  //TITLE
  const title = `${rowData.role?.role ?? ""}${
    rowData.anonymous ? " (Anonymous)" : ""
  }`;
  //PROFILE IMAGE
  const companyPageImage = rowData.anonymous
    ? ProfilePicture.UW_LOGO_GREY
    : getProfileImage(user?.profilePicture);
  const profilePageImage = rowData.company?.logo ?? "/logo-empty.png";
  const imageURL = page === Page.PROFILE ? profilePageImage : companyPageImage;
  //SUBTITLE
  const coopNumberString = rowData.coopNumber
    ? coopNumberSubtitleDisplay(rowData.coopNumber)
    : "";
  const subtitle = `${rowData.jobTerm ?? ""}${
    rowData.jobTerm && coopNumberString ? ", " : ""
  }${coopNumberString}`;
  //URL
  const companyPageURL = rowData.company
    ? `/companies/${rowData.company.id}`
    : `/`;
  const profilePageURL = rowData.anonymous
    ? undefined
    : rowData.user
    ? `/user/${rowData.user.id}`
    : undefined;
  const url = isProfilePage ? companyPageURL : profilePageURL;

  return {
    title,
    imageURL,
    subtitle,
    url,
  };
};

export const JobTitleCell = (props: IJobTitleCell) => {
  const { subtitle, title, url, imageURL } = props;
  const { isMobile } = useViewport();
  return (
    <JobTitleCellWrapper>
      <StyledLink href={url} target="_blank">
        <CompanyProfilePic imageURL={imageURL} />
      </StyledLink>
      <CompanyDetailsWrapper>
        <StyledLink href={url} target="_blank">
          <Typography>{title}</Typography>
        </StyledLink>
        <Typography variant={isMobile ? undefined : "caption"}>
          {subtitle}
        </Typography>
      </CompanyDetailsWrapper>
    </JobTitleCellWrapper>
  );
};

const CompanyProfilePic = styled.div<ICompanyProfilePic>`
  min-width: 64px;
  height: 64px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #bbb;
  background-image: url(${props => props.imageURL ?? "/logo-empty.png"});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const JobTitleCellWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface ICompanyProfilePic {
  imageURL?: string;
}

const CompanyDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledLink = styled.a`
  color: ${Color.primaryButtonShadow};
`;
