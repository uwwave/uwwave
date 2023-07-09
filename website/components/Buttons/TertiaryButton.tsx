import { ButtonBase, Typography } from "@mui/material";
import { Color } from "src/styles/color";
import styled from "styled-components";

interface ITertiaryButton {
  text: string;
  onClick?: () => void;
  white?: boolean;
  bold?: boolean;
  underline?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  marginTop?: number;
}
export const TertiaryButton = ({
  text,
  onClick,
  white,
  bold,
  underline,
  startIcon,
  disabled,
  endIcon,
  marginTop,
}: ITertiaryButton) => {
  return (
    <StyledButtonBase disabled={disabled} marginTop={marginTop}>
      <Main onClick={onClick} disabled={disabled ?? false}>
        {startIcon}
        <StyledTypography
          fillColor={white ? "white" : undefined}
          bold={bold}
          underline={underline}
        >
          {text}
        </StyledTypography>
        {endIcon}
      </Main>
    </StyledButtonBase>
  );
};

interface IDisabled {
  disabled: boolean;
}
const Main = styled.div<IDisabled>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? "initial" : "pointer")};
  gap: 8px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
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

interface IMarginTop {
  marginTop?: number;
}
const StyledButtonBase = styled(ButtonBase)<IMarginTop>`
  && {
    border-radius: 4px;
    ${props => (props.marginTop ? "margin-top: -4px;" : "")}
  }
`;
