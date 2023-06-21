import MUICheckbox from "@mui/material/Checkbox";
import React from "react";
import { Color } from "src/styles/color";
import styled from "styled-components";

export const Checkbox = styled(otherProps => <MUICheckbox {...otherProps} />)`
  && {
    fill: white;
    color: white;
  }
  &&&:hover {
    background-color: ${props =>
      props.accent ? Color.primaryButton : "rgba(0, 0, 0, 0.05)"};
  }
`;
