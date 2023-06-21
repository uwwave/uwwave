import styled from "styled-components";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { Color } from "src/styles/color";
import { Typography } from "@mui/material";
import { useAddReviewButton } from "src/lib/hooks/useAddReviewButton";
import { AddReviewModal } from "../Modals/variants/AddReviewModal";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";

interface IAddReviewButton {
  company?: ICompanyClearbitData;
}
export const AddReviewButton = ({ company }: IAddReviewButton) => {
  const { isLoggedIn, open, close, isOpen } = useAddReviewButton();
  if (!isLoggedIn) {
    return null;
  }
  return (
    <>
      <AddReviewModal isOpen={isOpen} close={close} company={company} />
      <StyledButton onClick={open}>
        <IconsWrapper>
          <Typography color="white" variant="subtitle1">
            +
          </Typography>

          <StarHalfIcon fill="white" />
        </IconsWrapper>
        <Typography color="white">Add a Review</Typography>
      </StyledButton>
    </>
  );
};

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const StyledButton = styled(PrimaryButton)`
  && {
    background-color: ${Color.rating}!important;
    box-shadow: 3px 4px ${Color.compatibility};
    padding-left: 16px;
    padding-right: 16px;
    min-width: 0;
  }

  &&:hover {
    background-color: ${Color.rating}!important;
    box-shadow: 3px 4px ${Color.compatibility};
  }
`;
