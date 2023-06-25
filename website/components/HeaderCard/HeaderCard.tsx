import Paper from "@mui/material/Paper";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import Skeleton from "@mui/material/Skeleton";
import { LogoLoader } from "../Loader/LogoLoader";
import { ProfileImageWithModal } from "./ProfileImage";
import { useViewport } from "src/lib/hooks/useViewport";
import { IMobile } from "src/lib/types/mobile";

interface CompanyCardProps {
  imageURL: string;
  title: string;
  subTitle?: React.ReactNode;
  subsubTitle?: React.ReactNode;
  isLoading?: boolean;
}

export const HeaderCard = ({
  imageURL,
  title,
  subTitle,
  subsubTitle,
  isLoading,
}: CompanyCardProps) => {
  const renderLoadingCompanyCard = () => {
    const { isMobile } = useViewport();
    return (
      <MainWrapper elevation={0}>
        <LoadingProfileWrapper isMobile={isMobile}>
          <LogoLoader width={isMobile ? 72 : undefined} />
        </LoadingProfileWrapper>
        <Spacer width={16} />
        {isMobile ? null : (
          <NameWrapper>
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} width={300} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={160} />
            {subsubTitle ? (
              <>
                <Spacer height={16} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={110}
                />
              </>
            ) : null}
            <Spacer height={16} />
            <></>
          </NameWrapper>
        )}
      </MainWrapper>
    );
  };

  if (isLoading) {
    return renderLoadingCompanyCard();
  }
  const { isMobile } = useViewport();
  return (
    <MainWrapper elevation={0}>
      <ProfileImageWithModal
        imageURL={imageURL}
        width={isMobile ? 104 : undefined}
      />
      <Spacer width={16} />
      <NameWrapper>
        <Typography variant="h5">
          <b>{title}</b>
        </Typography>
        {subTitle}

        {subsubTitle ? (
          <>
            <Spacer height={24} />
            {subsubTitle}
          </>
        ) : null}
      </NameWrapper>
    </MainWrapper>
  );
};

const LoadingProfileWrapper = styled.div<IMobile>`
  width: ${props => (props.isMobile ? 104 : 160)}px;
  height: ${props => (props.isMobile ? 104 : 160)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #f2f2f2;
`;
const MainWrapper = styled(Paper)`
  & {
    display: flex;
    position: relative;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 32px;
`;
