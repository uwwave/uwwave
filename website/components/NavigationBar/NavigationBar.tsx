import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MUITypography from "@mui/material/Typography";
import styled from "styled-components";
import { BackgroundColor } from "styles/color";
import { WaveLogo } from "src/components/icons/logo/Footer";
import Link from "next/link";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useRouter } from "next/router";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButtonCounter } from "../Buttons/IconButtonCounter";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { LoginButton } from "src/components/NavigationBar/LoginButton";
import { NotificationBanner } from "src/components/NavigationBar/NotificationBanner/NotificationBanner";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { AddReviewButton } from "./AddReviewButton";
import { useUserContext } from "src/lib/context/User/UserContext";
import { CompanySearchInput } from "../TextField/variants/CompanySearchInput";
import ButtonBase from "@mui/material/ButtonBase";
import { Spacer } from "../Spacer/Spacer";

export const NavigationBar = () => {
  const textColor = "white";
  const backgroundColor = BackgroundColor.dark;
  const { totalTaggedJobs } = useJobTagsContext();
  const { extensionData, isLoading: isExtensionLoading } =
    useExtensionsDataContext();
  const { isLoading: userLoading } = useUserContext();
  const areJobs = !!Object.keys(extensionData).length;
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(true);

  const path = router.pathname;
  const color = textColor ?? "white";
  const isLoading = userLoading || isExtensionLoading;

  const renderJobsLinks = () => (
    <>
      <TextWrapper>
        <MUITypography>
          <StyledLink
            href={"/jobs"}
            color={color}
            underline={(path === "/jobs").toString()}
            shallow
          >
            Jobs List
          </StyledLink>
        </MUITypography>
      </TextWrapper>
      <Spacer width={24} />
      <StyledLink href="/jobs/tagged">
        <TagListWrapper textColor={textColor}>
          <IconButtonCounter
            Icon={totalTaggedJobs ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            val={totalTaggedJobs}
          />
          <TaggedJobsText>Tagged Jobs</TaggedJobsText>
        </TagListWrapper>
      </StyledLink>
      <Spacer width={24} />
    </>
  );

  const renderSetupLinks = () => (
    <>
      <TextWrapper>
        <MUITypography>
          <StyledLink
            href={"/setup"}
            color={color}
            underline={(path === "/setup").toString()}
            shallow
          >
            Setup
          </StyledLink>
        </MUITypography>
      </TextWrapper>
      <Spacer width={24} />
    </>
  );

  const renderConditionalTabs = () => {
    return areJobs ? renderJobsLinks() : renderSetupLinks();
  };

  const renderTabs = () => {
    return (
      <FlexWrapper>
        <LogoWrapper width={showLogo ? 170 : 0}>
          <ButtonBase>
            <Link href="/">
              <WaveLogo color={color} />
            </Link>
          </ButtonBase>
          <Spacer width={24} />
        </LogoWrapper>

        <SearchWrapper>
          <CompanySearchInput
            onIn={() => {
              setShowLogo(false);
            }}
            onOut={() => {
              setShowLogo(true);
            }}
            onValue={data => {
              if (!data) {
                return;
              }
              router.push(`/companies/${data.id}`);
            }}
          />
        </SearchWrapper>
        {isLoading ? null : (
          <>
            <Spacer width={24} />
            {renderConditionalTabs()}
            <AddReviewButton />
            <Spacer width={24} />
            <LoginButton />
          </>
        )}
      </FlexWrapper>
    );
  };
  return (
    <>
      {isLoading ? null : <NotificationBanner />}
      <AppBar position="static" elevation={0} sx={{ bgcolor: backgroundColor }}>
        <Container>{renderTabs()}</Container>
      </AppBar>
    </>
  );
};

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const SearchWrapper = styled.div`
  flex: 1;
  padding-top: 8px;
`;

interface ILink {
  underline: string;
}
const Elemen = Link as any;
const StyledLink = styled(Elemen)<ILink>`
  && {
    text-decoration: ${props =>
      props.underline === "true" ? "underline" : "none"};
    color: ${props => props.color ?? BackgroundColor.darker};
  }

  &&:hover {
    text-decoration: underline;
  }
`;

interface ILogoWrapper {
  width: number;
}
const LogoWrapper = styled.div<ILogoWrapper>`
  && a {
    display: flex;
    align-items: center;
  }
  display: flex;
  overflow: hidden;
  width: ${props => props.width}px;
  transition: 0.3s ease width;
`;

const TextWrapper = styled.div`
  display: flex;
`;

interface ITagListWrapper {
  textColor?: string;
}

const TagListWrapper = styled.div<ITagListWrapper>`
  display: flex;
  align-items: baseline;
  && svg {
    color: ${props => props.textColor ?? BackgroundColor.darker};
  }

  && span {
    color: ${props => (props.textColor ? BackgroundColor.darker : "white")};
    font-weight: bold;
  }

  && p {
    color: ${props => props.textColor ?? BackgroundColor.darker};
  }
`;

const TaggedJobsText = styled(Typography)`
  && {
    margin-left: -12px;
  }
`;
