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
import { Spacer } from "src/components/Spacer/Spacer";
import { BackgroundColor } from "src/styles/color";

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
  maxWidth?: string;
  dark?: boolean;
  header?: React.ReactNode;
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
    maxWidth,
    dark,
    header,
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
      maxWidth={maxWidth ?? "md"}
      fullWidth
      dark={dark ?? false}
    >
      {header}
      <MainContentWrapper>
        {title || hasCloseX ? (
          <DialogTitle align={"center"} color={dark ? "white" : undefined}>
            <b>{title}</b>
            {hasCloseX && (
              <CloseButtonWrapper
                aria-label="close"
                onClick={handleClose}
                dark={dark ?? false}
              >
                <CloseIcon />
              </CloseButtonWrapper>
            )}
          </DialogTitle>
        ) : null}
        <DialogContent style={{ overflow: "visible" }}>
          {children}
        </DialogContent>
        <DialogActionsWrapper>
          {isLoading && (
            <>
              <LoadingAnimation />
              <Spacer height={16} />
            </>
          )}
          {onClickOk && !isLoading && (
            <PrimaryButton
              onClick={handleOk}
              disabled={isLoading || disableConfirm}
            >
              {confirmText ?? "Confirm"}
            </PrimaryButton>
          )}
          {onClickCancel && (
            <TypographyWrapper
              onClick={handleCancel}
              color="primary"
              margin={0}
            >
              Cancel
            </TypographyWrapper>
          )}
        </DialogActionsWrapper>
      </MainContentWrapper>
    </DialogWrapper>
  );
};

interface IDark {
  dark: boolean;
}
const CloseButtonWrapper = styled(IconButton)<IDark>`
  && {
    position: absolute;
    top: 0;
    right: 0;
    ${props => (props.dark ? "color: white" : "")};
  }
`;

const DialogWrapper = styled(otherProps => <Dialog {...otherProps} />)<IDark>`
  && > .MuiDialog {
    &-container {
      align-items: start;
    }
  }
  & > .MuiDialog-container > .MuiPaper-root {
    min-width: ${props => props.width};
    padding: 0;
    overflow-y: unset;
    background-color: ${props => (props.dark ? BackgroundColor.dark : "white")};
  }

  && > .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, ${props => (props.dark ? 0.6 : 0.5)});
  }
`;

const MainContentWrapper = styled.div`
  padding: 16px;
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
