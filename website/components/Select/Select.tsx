import styled from "styled-components";
import MUISelect from "@mui/material/Select";

export const Select = styled(MUISelect).attrs({
  variant: "outlined",
})`
  && {
    background-color: white;
  }
`;
