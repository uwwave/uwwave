import styled from "styled-components";
import Fab from "@mui/material/Fab";
import { Color } from "src/styles/color";

export const SecondaryButton = styled(Fab).attrs({
  variant: "extended",
})`
  && {
    color: ${Color.primaryButton};
    background-color: white;
    font-weight: bold;
    min-width: 180px;
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: 2px 3px ${Color.primaryButtonShadow};
    border: 3px solid ${Color.primaryButton};
  }
`;
