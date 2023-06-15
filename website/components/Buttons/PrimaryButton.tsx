import styled from "styled-components";
import Fab from "@mui/material/Fab";
import { Color } from "src/styles/color";
import Link from "next/link";

export const PrimaryButton = styled(Fab).attrs({
  variant: "extended",
})`
  && {
    color: white;
    background-color: ${props =>
      !props.disabled ? Color.primaryButton : "#999"}!important;
    font-weight: bold;
    min-width: 180px;
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: 3px 4px
      ${props => (!props.disabled ? Color.primaryButtonShadow : "#666")};
    gap: 8px;
  }
`;

interface IPrimaryButtonWithClientLink {
  href: string;
  children: React.ReactNode;
}
export const PrimaryButtonWithClientLink = ({
  href,
  children,
}: IPrimaryButtonWithClientLink) => (
  <PrimaryButton>
    <StyledLink href={href}>{children}</StyledLink>
  </PrimaryButton>
);

const Elemen = Link as any;
const StyledLink = styled(Elemen)`
  && {
    color: white;
    text-decoration: none;
  }
`;
