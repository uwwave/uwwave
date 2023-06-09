import { AppBar } from "@mui/material";
import MUITypography from "@mui/material/Typography";
import styled from "styled-components";
import { Color } from "styles/color";
import { WaveLogo } from "src/components/icons/logo/Navbar";
import Link from "@mui/material/Link";
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
                    variant="subtitle1"
                    href={pageItem.pageUrl}
                    color={color}
                    underline={path === pageItem.pageUrl ? "always" : "hover"}
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
  padding-top: 8px;
  padding-bottom: 8px;
`;
const StyledLink = styled(Link)`
  && {
    &:active {
      text-decoration: underline;
    }
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
