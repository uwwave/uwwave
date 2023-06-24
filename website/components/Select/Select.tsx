import styled from "styled-components";
import MUISelect from "@mui/material/Select";

export const Select = styled(MUISelect).attrs({
  variant: "outlined",
  size: "small",
})`
  && {
    background-color: white;
    border-radius: 20px;
    min-width: 96px;
  }
`;
