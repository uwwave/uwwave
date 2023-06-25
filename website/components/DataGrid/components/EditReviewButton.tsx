import styled from "styled-components";
import Button from "@mui/material/Button";
import { BackgroundColor } from "src/styles/color";
import EditIcon from "@mui/icons-material/Edit";
import { AddReviewModal } from "src/components/Modals/variants/AddReviewModal";
import { useAddReviewButton } from "src/lib/hooks/useAddReviewButton";
import { IJobReview } from "src/database/models/JobReview";
import { Page } from "src/lib/types/page";
import { IInterviewReview } from "src/database/models/InterviewReview";
import { useViewport } from "src/lib/hooks/useViewport";

interface IEditReviewButton {
  review?: IJobReview;
  interview?: IInterviewReview;
  onClose: () => void;
  origin?: Page;
}
export const EditReviewButton = ({
  review,
  onClose,
  origin,
  interview,
}: IEditReviewButton) => {
  const { open, isOpen, close: closeModal } = useAddReviewButton();
  const { isMobile } = useViewport();
  return (
    <>
      <AddReviewModal
        isOpen={isOpen}
        close={closeModal}
        afterSubmit={onClose}
        review={review}
        origin={origin}
        interview={interview}
      />
      <EditButton
        variant="contained"
        startIcon={<EditIcon />}
        size={isMobile ? "medium" : "small"}
        onClick={open}
      >
        Edit
      </EditButton>
    </>
  );
};

const EditButton = styled(Button)`
  && {
    background-color: ${BackgroundColor.dark};
  }
`;
