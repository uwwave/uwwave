import styled from "styled-components";
import { BackgroundColor, Color } from "styles/color";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { WaveLogo } from "src/components/icons/logo/Footer";
import Link from "@mui/material/Link";
import MUITypography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import { useRouter } from "next/router";

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
`;

interface IFooter {
  dark?: boolean;
}
export const Footer = (props: IFooter) => {
  const { dark } = props;
  const router = useRouter();
  const pathname = router.pathname;
  const useDarkFooter = pathname === "/" || pathname === "/about" || dark;
  return (
    <>
      <FooterWrapper
        color={useDarkFooter ? BackgroundColor.darker : BackgroundColor.dark}
      >
        {/* Weird font bug, need to wrap link with typography: https://mui.com/material-ui/api/link */}
        <MUITypography>
          <StyledLink
            href="/setup"
            color={Color.textPrimary}
            variant="inherit"
            underline="none"
          >
            Setup
          </StyledLink>
        </MUITypography>
        <Spacer height={16} />
        <MUITypography>
          <StyledLink
            href="/jobs"
            color={Color.textPrimary}
            variant="inherit"
            underline="none"
          >
            Jobs List
          </StyledLink>
        </MUITypography>
        <Spacer height={16} />
        <MUITypography>
          <StyledLink href="/about" color={Color.textPrimary} underline="none">
            About
          </StyledLink>
        </MUITypography>
        <Spacer height={16} />

        <Spacer height={16} />
        <SocialMediaWrapper>
          <IconWrapper>
            <FacebookIcon style={{ color: Color.textPrimary, fontSize: 40 }} />
          </IconWrapper>
          <IconWrapper>
            <InstagramIcon style={{ color: Color.textPrimary, fontSize: 40 }} />
          </IconWrapper>
          <IconWrapper>
            <TwitterIcon style={{ color: Color.textPrimary, fontSize: 40 }} />
          </IconWrapper>
        </SocialMediaWrapper>
        <IconWrapper>
          <WaveLogo color="white" />
        </IconWrapper>
      </FooterWrapper>
    </>
  );
};

const StyledLink = styled(Link)`
  && {
    font-size: 1rem;
  }
`;

const SocialMediaWrapper = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  padding: 10px;
`;
