import { AppBar } from "@mui/material";
import MUITypography from "@mui/material/Typography";
import styled from "styled-components";
import { BackgroundColor, Color } from "styles/color";
import { WaveLogo } from "src/components/icons/logo/Navbar";
import Link from "next/link";
import Container from "@mui/material/Container";
import React from "react";
import { Spacer } from "../Spacer/Spacer";
import { useRouter } from "next/router";

interface INavigationBar {
  textColor?: string;
  backgroundColor?: string;
}

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

export const NavigationBar = (props: INavigationBar) => {
  const { textColor, backgroundColor = "transparent" } = props;
  const router = useRouter();
  const path = router.pathname;
  const color = textColor ?? Color.textSecondary;
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
            {pages.map((pageItem: PageItem, i) => (
              <TextWrapper key={pageItem.pageUrl}>
                <MUITypography>
                  <StyledLink
                    href={pageItem.pageUrl}
                    color={color}
                    underline={path === pageItem.pageUrl}
                  >
                    {pageItem.pageName}
                  </StyledLink>
                </MUITypography>
                {i < pages.length - 1 ? <Spacer width={24} /> : null}
              </TextWrapper>
            ))}
          </FlexWrapper>
        </Container>
      </AppBar>
    </>
  );
};

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
`;

interface ILink {
  underline: boolean;
}
const Elemen = Link as any;
const StyledLink = styled(Elemen)<ILink>`
  && {
    text-decoration: ${props => (props.underline ? "underline" : "none")};
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
