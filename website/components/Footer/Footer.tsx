import styled from "styled-components";
import { BackgroundColor, Color } from "styles/color";
import MUITypography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import { useRouter } from "next/router";
import { TertiaryButton } from "../Buttons/TertiaryButton";
import { ButtonBase } from "@mui/material";
import Link from "next/link";
import { WaveLogo } from "../icons/logo/Footer";
import { useViewport } from "src/lib/hooks/useViewport";

interface IFooterWrapper {
  color: string;
}
const FooterWrapper = styled.div<IFooterWrapper>`
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 100;
`;

interface IFooter {
  dark?: boolean;
}
export const Footer = (props: IFooter) => {
  const { dark } = props;
  const router = useRouter();
  const pathname = router.pathname;
  const useDarkFooter = pathname === "/" || pathname === "/about" || dark;
  const { isMobile } = useViewport();
  const renderDesktopLinks = () => (
    <>
      <TertiaryButton
        text="Setup"
        onClick={() => router.push("/setup")}
        white
      />
      <Spacer height={16} />
      <TertiaryButton
        text="Jobs List"
        onClick={() => router.push("/jobs")}
        white
      />
      <Spacer height={16} />
      <TertiaryButton
        text="Tagged Jobs"
        onClick={() => router.push("/jobs/tagged")}
        white
      />
    </>
  );
  return (
    <>
      <FooterWrapper
        color={useDarkFooter ? BackgroundColor.darker : BackgroundColor.dark}
      >
        {isMobile ? null : renderDesktopLinks()}
        <Spacer height={16} />
        <TertiaryButton
          text="About"
          onClick={() => router.push("/about")}
          white
        />
        <Spacer height={32} />
        <ButtonBase>
          <Link href="/">
            <WaveLogo color={"white"} />
          </Link>
        </ButtonBase>
        <Spacer height={32} />
      </FooterWrapper>
      {process.env.NEXT_PUBLIC_DATABASE !== "PROD" ? (
        <StagingFooter>
          <MUITypography color="white">{"You're on staging ;)"}</MUITypography>
        </StagingFooter>
      ) : null}
    </>
  );
};

const StagingFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.primaryButton};
  padding: 8px;
`;
