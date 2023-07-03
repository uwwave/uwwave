import Paper from "@mui/material/Paper";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import Skeleton from "@mui/material/Skeleton";
import LaunchIcon from "@mui/icons-material/Launch";
import { BackgroundColor, Color } from "src/styles/color";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { LocationText } from "../LocationText/LocationText";
import { LogoLoader } from "../Loader/LogoLoader";
import { useRouter } from "next/router";
import { IMobile } from "src/lib/types/mobile";
import { useViewport } from "src/lib/hooks/useViewport";

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
  companyPageURL?: string;
  onOpenSubmitDomain: () => void;
}
interface MainWrapperProps {
  isOutlined?: boolean;
}

interface IOptionalExternalLink {
  text: string;
  link?: string;
  companyPageURL?: string;
  onOpenSubmitDomain: () => void;
}
const OptionalExternalLink = (props: IOptionalExternalLink) => {
  const { text, link, onOpenSubmitDomain, companyPageURL } = props;
  const router = useRouter();
  if (!link) {
    console.log(companyPageURL);
    return (
      <LinkWrapper
        onClick={() => {
          onOpenSubmitDomain();
        }}
      >
        <PulseText>{text}</PulseText>
        <StyledIconButton
          onClick={() => {
            onOpenSubmitDomain();
          }}
        >
          <EditIcon />
        </StyledIconButton>
      </LinkWrapper>
    );
  }
  if (companyPageURL) {
    return (
      <LinkWrapper>
        <a
          onClick={() => {
            router.push(companyPageURL);
          }}
        >
          <Typography>{text}</Typography>
          <LaunchIcon />
        </a>
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
  companyPageURL,
}: CompanyCardProps) => {
  const { isMobile } = useViewport();
  return (
    <MainWrapper variant={isOutlined ? "outlined" : "elevation"} elevation={0}>
      <ImageWrapper src={imageURL} isMobile={isMobile} />
      <Spacer width={16} />
      <NameWrapper>
        {positionTitle ? (
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{ lineHeight: isMobile ? "1.4rem" : undefined }}
          >
            <b>{positionTitle}</b>
          </Typography>
        ) : null}
        <OptionalExternalLink
          text={companyName}
          link={companyURL}
          onOpenSubmitDomain={onOpenSubmitDomain}
          companyPageURL={companyPageURL}
        />
        <Spacer height={isMobile ? 8 : 24} />
        <LocationText icon city={city} province={province} country={country} />
      </NameWrapper>
    </MainWrapper>
  );
};

export const LoadingCompanyCard = () => {
  const { isMobile } = useViewport();
  return (
    <MainWrapper elevation={0}>
      <LoadingProfileWrapper isMobile={isMobile}>
        <LogoLoader width={isMobile ? 64 : 96} />
      </LoadingProfileWrapper>
      {isMobile ? null : (
        <>
          <Spacer width={16} />
          <NameWrapper>
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} width={300} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={160} />
            <Spacer height={16} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={110} />
          </NameWrapper>
        </>
      )}
    </MainWrapper>
  );
};

const LoadingProfileWrapper = styled.div<IMobile>`
  width: ${props => (props.isMobile ? 96 : 160)}px;
  height: ${props => (props.isMobile ? 96 : 160)}px;
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
const ImageWrapper = styled.div<IImageWrapper & IMobile>`
  min-width: ${props => (props.isMobile ? 96 : 160)}px;
  height: ${props => (props.isMobile ? 96 : 160)}px;
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
  flex-wrap: wrap;
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

const StyledIconButton = styled(IconButton)`
  && {
    animation: pulse 1s infinite ease-in-out;
  }
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.3);
    }
  }
`;

const PulseText = styled(Typography)`
  && {
    animation: pulse2 1s infinite ease-in-out;
    text-decoration: underline;
  }
  @keyframes pulse2 {
    0%,
    100% {
      color: ${BackgroundColor.darker};
      text-decoration-color: white;
    }

    50% {
      text-decoration-color: ${Color.primary};
    }
  }
`;
