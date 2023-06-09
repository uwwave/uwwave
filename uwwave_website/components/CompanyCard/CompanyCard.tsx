import Paper from "@mui/material/Paper";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import { getCountryFlag } from "../CountryFlag/CountryFlag";
import Skeleton from "@mui/material/Skeleton";

interface CompanyCardProps {
  imageURL: string;
  companyName: string;
  city?: string;
  country?: string;
  state?: string;
  positionTitle?: string;
  reviewCount?: number;
  ratingValue?: number;
  subtitle?: string;
  isOutlined?: boolean;
}
interface MainWrapperProps {
  isOutlined?: boolean;
}

export const CompanyCard = ({
  imageURL,
  companyName,
  city,
  country,
  positionTitle,
  isOutlined,
}: CompanyCardProps) => {
  const countryFlag = getCountryFlag(country ?? "");
  return (
    <MainWrapper variant={isOutlined ? "outlined" : "elevation"} elevation={0}>
      <ImageWrapper src={imageURL} />
      <Spacer width={16} />
      <NameWrapper>
        {positionTitle ? (
          <Typography variant="h4">
            <b>{positionTitle}</b>
          </Typography>
        ) : null}
        <Typography>{companyName}</Typography>
        <Spacer height={24} />
        {city && country ? (
          <LocationWrapper>
            <IconWrapper />
            <Typography color="gray">
              {`${city}${!countryFlag ? `, ${country}` : ""}`}
            </Typography>
            <Spacer width={8} />
            {getCountryFlag(country ?? "")}
          </LocationWrapper>
        ) : null}
      </NameWrapper>
    </MainWrapper>
  );
};

export const LoadingCompanyCard = () => {
  return (
    <MainWrapper elevation={0}>
      <Skeleton variant="rounded" width={160} height={160} />
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
  width: 160px;
  height: 160px;
  border: 1px solid #ddd;
  border-radius: 16px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled(LocationOnIcon).attrs({
  fontSize: "small",
})`
  && {
    fill: gray;
  }
`;
