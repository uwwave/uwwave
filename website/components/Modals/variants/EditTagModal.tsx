import Typography from "@mui/material/Typography";
import { BaseModal } from "../BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import { ITag } from "src/lib/requests/ExtensionRequests";
import Chip from "@mui/material/Chip";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ColorPicker from "src/components/ColorPicker/ColorPicker";
import React from "react";
import TextField from "@mui/material/TextField";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonBase from "@mui/material/ButtonBase";
import { convertToCamelCase } from "src/lib/strings/convertStrings";
import { IconColorWrapper } from "src/components/icons/ColorWrapper";
import { useEditTagModal } from "src/lib/hooks/useEditTagModal";

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
  tag: ITag;
  allTags: ITag[];
  onPatchTag: (newTag: ITag) => void;
  onDeleteTag: () => void;
}

export const EditTagModal = (props: IUploadDomainModal) => {
  const {
    isOpen,
    onClose,
    tag: initTag,
    allTags,
    onPatchTag,
    onDeleteTag,
  } = props;
  const {
    deleteMode,
    setDeleteMode,
    setTag,
    isLoading,
    disabled,
    handlePatchTag,
    handleDeleteTag,
    colors,
    tagExistsError,
    tag,
  } = useEditTagModal(isOpen, initTag, allTags, onPatchTag, onDeleteTag);

  const renderDeleteModeButtons = () => {
    if (!deleteMode) {
      return;
    }
    return (
      <>
        <Spacer height={16} />
        <Typography
          color="red"
          align="center"
        >{`Are you sure? This can't be undone`}</Typography>
        <Center>
          <StyledButtonBase
            onClick={() => {
              setDeleteMode(false);
            }}
          >
            <Typography>Cancel</Typography>
          </StyledButtonBase>
        </Center>
      </>
    );
  };

  const renderUpdateButtons = () => {
    if (deleteMode) {
      return;
    }
    return (
      <Center>
        <StyledPrimaryButton disabled={disabled} onClick={handlePatchTag}>
          Update
        </StyledPrimaryButton>
      </Center>
    );
  };

  const renderDeleteTagButton = () => (
    <Center>
      <Button
        onClick={() => {
          deleteMode ? handleDeleteTag() : setDeleteMode(true);
        }}
        color="error"
        startIcon={deleteMode ? <DeleteIcon /> : <DeleteOutlineIcon />}
        variant={deleteMode ? "contained" : "text"}
      >
        Delete Tag
      </Button>
    </Center>
  );
  const renderConfirmButtons = () => {
    if (isLoading) {
      return;
    }
    return (
      <>
        <Spacer height={16} />
        {renderUpdateButtons()}
        {!isLoading ? <Spacer height={16} /> : null}
        {renderDeleteTagButton()}
        {renderDeleteModeButtons()}
      </>
    );
  };

  const renderTitle = () => (
    <Typography align="center" variant="h5">
      <b>{`Edit "${initTag.label}" Tag`}</b>
    </Typography>
  );

  const renderTagPreview = () => {
    if (!tag) {
      return;
    }
    return (
      <Center>
        <StyledChip
          icon={
            <IconColorWrapper color="white">
              <BookmarkIcon color="inherit" />
            </IconColorWrapper>
          }
          bgcolor={tag.color}
          label={<Typography>{tag.label}</Typography>}
        />{" "}
      </Center>
    );
  };

  const renderForm = () => (
    <Edit>
      <ColorPickerWrapper>
        <ColorPicker
          value={tag.color}
          colors={colors}
          callback={(color: string) => {
            setTag({ label: tag.label, color });
          }}
        />
      </ColorPickerWrapper>
      <TextField
        variant="outlined"
        size="small"
        defaultValue={tag.label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTag({
            color: tag.color,
            label: convertToCamelCase(e.target.value),
          });
        }}
      />
    </Edit>
  );
  const renderError = () => (
    <Typography
      color={tagExistsError ? "red" : "white"}
      align="center"
    >{`Tag "${tag.label}" already exists`}</Typography>
  );
  return (
    <BaseModal
      open={isOpen}
      confirmText="Submit"
      onCloseModal={onClose}
      maxWidth="xs"
      isLoading={isLoading}
    >
      {renderTitle()}
      <Spacer height={16} />
      {renderTagPreview()}
      <Spacer height={16} />
      {renderForm()}
      {renderError()}
      {renderConfirmButtons()}
    </BaseModal>
  );
};

const StyledButtonBase = styled(ButtonBase)`
  padding: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
`;
const StyledPrimaryButton = styled(PrimaryButton)`
  && {
    z-index: 0;
  }
`;
const ColorPickerWrapper = styled.div`
  && {
    position: relative;
    z-index: 300;
  }
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

interface IChip {
  bgcolor: string;
}
const StyledChip = styled(Chip)<IChip>`
  && {
    background-color: ${props => props.bgcolor};
    color: white;
  }
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
