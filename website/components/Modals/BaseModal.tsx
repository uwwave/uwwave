import CloseIcon from "@mui/icons-material/Close";
import { PrimaryButton } from "components/Buttons/PrimaryButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import LoadingAnimation from "@mui/material/CircularProgress";
import React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

export interface ModalProps {
  open: boolean;
  title?: string | React.ReactElement | null;
  hasCloseX?: boolean;
  onCloseModal?: () => void;
  onClickOk?: () => void;
  confirmText?: string;
  onClickCancel?: () => void;
  children?: string | React.ReactNode;
  isLoading?: boolean;
  disableConfirm?: boolean;
}

export const BaseModal = (props: ModalProps): JSX.Element => {
  const {
    open,
    title,
    hasCloseX = false,
    onCloseModal,
    onClickOk,
    confirmText,
    onClickCancel,
    children,
    isLoading,
    disableConfirm,
  } = props;
  const handleClose = () => {
    onCloseModal && onCloseModal();
  };

  const handleCancel = () => {
    onClickCancel && onClickCancel();
  };

  const handleOk = () => {
    onClickOk && onClickOk();
  };

  return (
    <DialogWrapper
      open={open}
      onClose={handleClose}
      maxWidth={"md"}
      fullWidth
    >
      <DialogTitle align={"center"}>
        <b>{title}</b>
        {hasCloseX && (
          <CloseButtonWrapper aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButtonWrapper>
        )}
      </DialogTitle>
      <DialogContent style={{ overflow: "visible" }}>{children}</DialogContent>
      <DialogActionsWrapper>
        {isLoading && <LoadingAnimation />}
        {onClickOk && !isLoading && (
          <PrimaryButton
            onClick={handleOk}
            disabled={isLoading || disableConfirm}
          >
            {confirmText ?? "Confirm"}
          </PrimaryButton>
        )}
        {onClickCancel && (
          <TypographyWrapper onClick={handleCancel} color="primary" margin={0}>
            Cancel
          </TypographyWrapper>
        )}
      </DialogActionsWrapper>
    </DialogWrapper>
  );
};

const CloseButtonWrapper = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const DialogWrapper = styled(otherProps => <Dialog {...otherProps} />)`
  && > .MuiDialog {
    &-container {
      align-items: start;
    }
  }
  & > .MuiDialog-container > .MuiPaper-root {
    min-width: ${props => props.width};
    padding: 16px;
  }

  & {
    overflow: visible;
  }
`;

const DialogActionsWrapper = styled(DialogActions)`
  display: flex;
  flex-direction: column;
`;

const TypographyWrapper = styled(otherProps => <Typography {...otherProps} />)`
  && {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;
