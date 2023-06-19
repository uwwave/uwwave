import Button from "@mui/material/Button";
import styled from "styled-components";

export const ContinueWithGoogleButton = styled(Button).attrs({
  variant: "outlined",
  fullwidth: true,
  color: "inherit",
})`
  && {
    background-color: white;
    width: 100%;
    padding: 12px;
    border: 1px solid #dadce0;
    border-radius: 32px;
    display: flex;
  }

  &&:hover {
    background-color: white;
  }

  && p {
    color: black;
    font-family: Roboto, sans-serif;
    text-transform: none;
    font-weight: bold;
  }
`;
