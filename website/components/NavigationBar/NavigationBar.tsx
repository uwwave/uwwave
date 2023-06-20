import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MUITypography from "@mui/material/Typography";
import styled from "styled-components";
import { BackgroundColor } from "styles/color";
import { WaveLogo } from "src/components/icons/logo/Navbar";
import Link from "next/link";
import Container from "@mui/material/Container";
import React from "react";
import { useRouter } from "next/router";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButtonCounter } from "../Buttons/IconButtonCounter";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { LoginButton } from "src/components/NavigationBar/LoginButton";
import { NotificationBanner } from "src/components/NavigationBar/NotificationBanner/NotificationBanner";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { LogoLoader } from "../Loader/LogoLoader";
import { AddReviewButton } from "./AddReviewButton";
import { useUserContext } from "src/lib/context/User/UserContext";

export const NavigationBar = () => {
  const textColor = "white";
  const backgroundColor = BackgroundColor.dark;
  const { totalTaggedJobs } = useJobTagsContext();
  const { extensionData, isLoading: extensionDataLoading } =
    useExtensionsDataContext();
  const { isLoading: userLoading } = useUserContext();
  const areJobs = !!Object.keys(extensionData).length;
  const router = useRouter();

  const path = router.pathname;
  const color = textColor ?? "white";
  const isLoading = extensionDataLoading || userLoading;

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
      <StyledLink href="/jobs/tagged">
        <TagListWrapper textColor={textColor}>
          <IconButtonCounter
            Icon={totalTaggedJobs ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            val={totalTaggedJobs}
          />
          <TaggedJobsText>Tagged Jobs</TaggedJobsText>
        </TagListWrapper>
      </StyledLink>
    </>
  );

  const renderSetupLinks = () => (
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
  );

  const renderConditionalTabs = () => {
    return areJobs ? renderJobsLinks() : renderSetupLinks();
  };

  const renderTabs = () => {
    if (isLoading) {
      return (
        <Center>
          <LogoLoader width={40} darkMode />
        </Center>
      );
    }

    return (
      <FlexWrapper>
        <LogoWrapper>
          <Link href="/">
            <WaveLogo color={color} />
          </Link>
        </LogoWrapper>
        {renderConditionalTabs()}
        <AddReviewButton />
        <LoginButton />
      </FlexWrapper>
    );
  };

  return (
    <>
      <NotificationBanner />
      <AppBar position="static" elevation={0} sx={{ bgcolor: backgroundColor }}>
        <Container>{renderTabs()}</Container>
      </AppBar>
    </>
  );
};

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
  padding-bottom: 4px;
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 4px;
  padding-bottom: 4px;
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

const LogoWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-grow: 1;
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
