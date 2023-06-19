import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const RoundedTextField = styled(TextField).attrs({
  variant: "outlined",
  fullWidth: true,
})`
  && {
    background-color: white;
    border-radius: 32px;
  }

  && .MuiOutlinedInput-root {
    border-radius: 32px;
  }

  && div input {
    padding-left: 24px;
  }
`;
