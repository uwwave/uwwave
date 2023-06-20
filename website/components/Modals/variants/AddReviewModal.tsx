import { BaseModal } from "src/components/Modals/BaseModal";
import React from "react";
import styled from "styled-components";
import { Color } from "src/styles/color";
import { Spacer } from "src/components/Spacer/Spacer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { CompanySearchInput } from "src/components/TextField/variants/CompanySearchInput";
import { JobRoleSearchInput } from "src/components/TextField/variants/JobRoleSearnInput";

interface IAddReviewModal {
  isOpen: boolean;
  close: () => void;
}
export const AddReviewModal = ({ isOpen, close }: IAddReviewModal) => {
  // const {
  //   error
  // } = useAddReviewModal();
  return (
    <BaseModal
      open={isOpen}
      title={"Add Your Review"}
      onCloseModal={close}
      maxWidth="xs"
      dark
    >
      {
        // This is so that the input doesn't flash when we close the modal
        // We still want this to reset the displayed search input on close
        isOpen ? (
          <CompanySearchInput
            onValue={data => {
              console.log(data);
            }}
          />
        ) : (
          <CompanySearchInput />
        )
      }

      <Spacer height={4} />
      {
        // This is so that the input doesn't flash when we close the modal
        // We still want this to reset the displayed search input on close
        isOpen ? (
          <JobRoleSearchInput
            onValue={data => {
              console.log(data);
            }}
          />
        ) : (
          <JobRoleSearchInput />
        )
      }
      <Spacer height={8} />
      <Typography color="white" align="center" variant="subtitle1">
        Select a Review Type
      </Typography>
      <Spacer height={8} />
      <ReviewTypesWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton bgcolor={Color.rating}>
            <ReviewIcon />
            <Typography color="white" variant="h5" align="center">
              Job
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton bgcolor={Color.compatibility}>
            <InterviewIcon />
            <Typography color="white" variant="h5" align="center">
              Interview
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
      </ReviewTypesWrapper>
    </BaseModal>
  );
};

const ReviewTypesWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ReviewTypeWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

interface IReviewButton {
  bgcolor: string;
}
const ReviewTypeButton = styled(ButtonBase)<IReviewButton>`
  && {
    padding: 32px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${props => props.bgcolor};
  }
`;

const ReviewIcon = styled(StarHalfIcon)`
  && {
    font-size: 72px;
    color: white;
  }
`;

const InterviewIcon = styled(VideoCameraFrontIcon)`
  && {
    font-size: 72px;
    color: white;
  }
`;
