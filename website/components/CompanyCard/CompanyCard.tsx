import Paper from "@mui/material/Paper";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import Skeleton from "@mui/material/Skeleton";
import LaunchIcon from "@mui/icons-material/Launch";
import { Color } from "src/styles/color";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { LocationText } from "../LocationText/LocationText";
import { LogoLoader } from "../Loader/LogoLoader";

interface CompanyCardProps {
  imageURL: string;
  companyName: string;
  city?: string;
  province?: string;
  country?: string;
  state?: string;
  positionTitle?: string;
  reviewCount?: number;
  ratingValue?: number;
  subtitle?: string;
  isOutlined?: boolean;
  companyURL?: string;
  onOpenSubmitDomain: () => void;
}
interface MainWrapperProps {
  isOutlined?: boolean;
}

interface IOptionalExternalLink {
  text: string;
  link?: string;
  onOpenSubmitDomain: () => void;
}
const OptionalExternalLink = (props: IOptionalExternalLink) => {
  const { text, link, onOpenSubmitDomain } = props;

  if (!link) {
    return (
      <LinkWrapper onClick={onOpenSubmitDomain}>
        <Typography>{text}</Typography>
        <IconButton>
          <EditIcon />
        </IconButton>
      </LinkWrapper>
    );
  }
  return (
    <LinkWrapper>
      <a href={`https://${link}`} target="_blank">
        <Typography>{text}</Typography>
        <LaunchIcon />
      </a>
    </LinkWrapper>
  );
};

export const CompanyCard = ({
  imageURL,
  companyName,
  city,
  province,
  country,
  positionTitle,
  isOutlined,
  companyURL,
  onOpenSubmitDomain,
}: CompanyCardProps) => {
  return (
    <MainWrapper variant={isOutlined ? "outlined" : "elevation"} elevation={0}>
      <ImageWrapper src={imageURL} />
      <Spacer width={16} />
      <NameWrapper>
        {positionTitle ? (
          <Typography variant="h5">
            <b>{positionTitle}</b>
          </Typography>
        ) : null}
        <OptionalExternalLink
          text={companyName}
          link={companyURL}
          onOpenSubmitDomain={onOpenSubmitDomain}
        />
        <Spacer height={24} />
        <LocationText icon city={city} province={province} country={country} />
      </NameWrapper>
    </MainWrapper>
  );
};

export const LoadingCompanyCard = () => {
  return (
    <MainWrapper elevation={0}>
      <LoadingProfileWrapper>
        <LogoLoader />
      </LoadingProfileWrapper>
      <Spacer width={16} />
      <NameWrapper>
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} width={300} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={160} />
        <Spacer height={16} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={110} />
      </NameWrapper>
    </MainWrapper>
  );
};

const LoadingProfileWrapper = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #f2f2f2;
`;
const MainWrapper = styled(Paper)<MainWrapperProps>`
  & {
    display: flex;
    padding: ${props => (props.isOutlined ? `16px` : "0px")};
    position: relative;
  }
`;

interface IImageWrapper {
  src: string;
}
const ImageWrapper = styled.div<IImageWrapper>`
  min-width: 160px;
  height: 160px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 32px;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  && svg {
    color: ${Color.primaryButton};
  }
  & a {
    display: flex;
    align-items: center;
    color: ${Color.primaryButton};
    text-decoration-color: ${Color.primaryButton};
  }
`;
