import { Color } from "src/styles/color";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { IUserData } from "src/database/models/UserData";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { ProfilePicture, getProfileImage } from "src/lib/types/profiles";
import { IJobRole } from "src/database/models/JobRole";
import { Page } from "src/lib/types/page";
import { coopNumberSubtitleDisplay } from "src/lib/reviews/summary";
import { useViewport } from "src/lib/hooks/useViewport";

interface IJobTitleCell {
  subtitle: string;
  title: string;
  url?: string;
  imageURL?: string;
}

interface IData {
  user: IUserData;
  anonymous: boolean;
  company: ICompanyClearbitData;
  role: IJobRole;
  coopNumber?: number;
}
export const getJobTitleCellProps = (rowData: IData, page?: Page) => {
  const roleSubtitle = `${
    rowData.coopNumber
      ? `${rowData.role.role}${coopNumberSubtitleDisplay(rowData.coopNumber)}`
      : rowData.role.role
  }`;
  const user = rowData.user;
  const isProfilePage = page === Page.PROFILE;
  //TITLE
  const companyPageTitle = rowData.anonymous
    ? "Anonymous"
    : rowData.user.username;
  const profilePageTitle = rowData.company.companyName;
  const title = isProfilePage ? profilePageTitle : companyPageTitle;
  //PROFILE IMAGE
  const companyPageImage = rowData.anonymous
    ? ProfilePicture.UW_LOGO_GREY
    : getProfileImage(user?.profilePicture);
  const profilePageImage = rowData.company.logo ?? "/logo-empty.png";
  const imageURL = page === Page.PROFILE ? profilePageImage : companyPageImage;
  //SUBTITLE
  const companyPageSubtitle = rowData.anonymous ? "" : roleSubtitle;
  const profilePageSubtitle = rowData.anonymous ? "anonymous" : roleSubtitle;
  const subtitle = isProfilePage ? profilePageSubtitle : companyPageSubtitle;
  //URL
  const companyPageURL = `/companies/${rowData.company.id}`;
  const profilePageURL = rowData.anonymous
    ? undefined
    : `/user/${rowData.user.id}`;
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
