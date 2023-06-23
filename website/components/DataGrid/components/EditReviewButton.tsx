import styled from "styled-components";
import Button from "@mui/material/Button";
import { BackgroundColor } from "src/styles/color";
import EditIcon from "@mui/icons-material/Edit";
import { AddReviewModal } from "src/components/Modals/variants/AddReviewModal";
import { useAddReviewButton } from "src/lib/hooks/useAddReviewButton";
import { IJobReview } from "src/database/models/JobReview";
import { Page } from "src/lib/types/page";

interface IEditReviewButton {
  review: IJobReview;
  onClose: () => void;
  origin?: Page;
}
export const EditReviewButton = ({
  review,
  onClose,
  origin,
}: IEditReviewButton) => {
  const { open, isOpen, close: closeModal } = useAddReviewButton();
  const close = () => {
    closeModal();
    onClose();
  };
  return (
    <>
      <AddReviewModal
        isOpen={isOpen}
        close={close}
        review={review}
        origin={origin}
      />
      <EditButton
        variant="contained"
        startIcon={<EditIcon />}
        size="small"
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
