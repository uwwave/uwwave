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

type PageItem = {
  pageName: string;
  pageUrl: string;
};

const pages: PageItem[] = [
  {
    pageName: "Setup",
    pageUrl: "/setup",
  },
  {
    pageName: "Jobs List",
    pageUrl: "/jobs",
  },
];

export const NavigationBar = () => {
  const textColor = "white";
  const backgroundColor = BackgroundColor.dark;
  const { totalTaggedJobs } = useJobTagsContext();
  const router = useRouter();

  const path = router.pathname;
  const color = textColor ?? "white";

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: backgroundColor }}>
        <Container>
          <FlexWrapper>
            <LogoWrapper>
              <Link href="/">
                <WaveLogo color={color} />
              </Link>
            </LogoWrapper>
            {pages.map((pageItem: PageItem) => (
              <TextWrapper key={pageItem.pageUrl}>
                <MUITypography>
                  <StyledLink
                    href={pageItem.pageUrl}
                    color={color}
                    underline={(path === pageItem.pageUrl).toString()}
                    shallow
                  >
                    {pageItem.pageName}
                  </StyledLink>
                </MUITypography>
              </TextWrapper>
            ))}
            <StyledLink href="/jobs/tagged">
              <TagListWrapper textColor={textColor}>
                <IconButtonCounter
                  Icon={
                    totalTaggedJobs ? <BookmarkIcon /> : <BookmarkBorderIcon />
                  }
                  val={totalTaggedJobs}
                />
                <TaggedJobsText>Tagged Jobs</TaggedJobsText>
              </TagListWrapper>
            </StyledLink>
            <LoginButton />
          </FlexWrapper>
        </Container>
      </AppBar>
    </>
  );
};

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
