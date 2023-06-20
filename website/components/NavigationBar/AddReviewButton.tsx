import styled from "styled-components";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { Color } from "src/styles/color";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAddReviewButton } from "src/lib/hooks/useAddReviewButton";
import { AddReviewModal } from "../Modals/variants/AddReviewModal";

export const AddReviewButton = () => {
  const { isLoggedIn, open, close, isOpen } = useAddReviewButton();
  if (!isLoggedIn) {
    return null;
  }
  return (
    <>
      <AddReviewModal isOpen={isOpen} close={close} />
      <StyledButton onClick={open}>
        <AddIcon fill="white" />
        <Typography color="white">Add a Review</Typography>
      </StyledButton>
    </>
  );
};

const StyledButton = styled(PrimaryButton).attrs({
  size: "small",
})`
  && {
    background-color: ${Color.rating}!important;
    box-shadow: 3px 4px ${Color.compatibility};
    padding-left: 8px;
    padding-right: 16px;
    min-width: 0;
  }

  &&:hover {
    background-color: ${Color.rating}!important;
    box-shadow: 3px 4px ${Color.compatibility};
  }
`;
