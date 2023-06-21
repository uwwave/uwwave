import { Typography } from "@mui/material";
import { Color } from "src/styles/color";
import styled from "styled-components";

interface ITertiaryButton {
  text: string;
  onClick?: () => void;
  white?: boolean;
  bold?: boolean;
  underline?: boolean;
  startIcon?: React.ReactNode;
}
export const TertiaryButton = ({
  text,
  onClick,
  white,
  bold,
  underline,
  startIcon,
}: ITertiaryButton) => {
  return (
    <Main onClick={onClick}>
      {startIcon}
      <StyledTypography
        fillColor={white ? "white" : undefined}
        bold={bold}
        underline={underline}
      >
        {text}
      </StyledTypography>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface IStyledTypography {
  fillColor?: string;
  bold?: boolean;
  underline?: boolean;
}
const StyledTypography = styled(Typography)<IStyledTypography>`
  && {
    color: ${props => props.fillColor ?? Color.primaryButton};
    ${props => (props.underline ? "text-decoration: underline;" : "")}
    ${props => (props.bold ? "font-weight: bold;" : "")}
  }

  &&:hover {
    text-decoration: underline;
  }

  &&:active {
    color: ${Color.primary};
  }
`;
