import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import { Spacer } from "src/components/Spacer/Spacer";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckIcon from "@mui/icons-material/Check";
import Chip from "@mui/material/Chip";
import { BackgroundColor } from "src/styles/color";
import styled from "styled-components";
import { useTagsMenu } from "src/lib/hooks/useTagsMenu";
import LoadingAnimation from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ITag } from "src/lib/requests/ExtensionRequests";
import React, { useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditTagModal } from "src/components/Modals/variants/EditTagModal";
import { IconColorWrapper } from "src/components/icons/ColorWrapper";

interface ITagsMenu {
  selectedTags?: ITag[];
  tagsToSelect?: ITag[];
  onOutsideClick: () => void;
  onSetSelectedTags: (tags: ITag[]) => void;
  onSetTagsToSelect: (tags: ITag[]) => void;
}
export const JobTagsMenu = (props: ITagsMenu) => {
  const {
    selectedTags: tagsSelected,
    tagsToSelect: selectableTags,
    onOutsideClick,
    onSetSelectedTags,
    onSetTagsToSelect,
  } = props;
  const {
    loading,
    selectedTags,
    tagsToSelect,
    selectTag,
    removeTag,
    inputVal,
    setInputVal,
    canCreateNew,
    onSubmit,
    error,
    editTag,
    setEditTag,
    isEditModalOpen,
    onPatchTag,
    onDeleteTag,
  } = useTagsMenu(
    123,
    onSetSelectedTags,
    onSetTagsToSelect,
    tagsSelected,
    selectableTags
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !isEditModalOpen
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick, isEditModalOpen]);
  const renderLoadingState = () => (
    <TagsWrapper>
      <Spacer height={16} />
      <Center>
        <StyledLoadingAnimation />
      </Center>
      <Spacer height={16} />
    </TagsWrapper>
  );

  const renderSelectedChips = () => (
    <>
      <ChipsWrapper>
        {selectedTags.map(tag => (
          <StyledChip
            key={tag.label}
            bgcolor={tag.color}
            label={renderInnerChipContent({
              tag: tag,
              onSetEditTag: setEditTag,
            })}
            deleteIcon={<ClearIcon />}
            onDelete={() => {
              removeTag(tag.label);
            }}
          />
        ))}
      </ChipsWrapper>
      {selectedTags.length > 0 ? <Spacer height={8} /> : null}
    </>
  );

  const renderMenu = () => (
    <TagsListWrapper>
      <StyledMenuList>
        {tagsToSelect.map(tag => (
          <StyledMenuItem key={tag.label}>
            <StyledListItemText
              bgcolor={tag.color}
              onClick={() => {
                selectTag(tag.label);
              }}
            >
              {tag.label}
            </StyledListItemText>
            <ListItemIcon
              onClick={() => {
                selectTag(tag.label);
              }}
            >
              <IconColorWrapper color={tag.color}>
                <CheckIcon color="inherit" />
              </IconColorWrapper>
            </ListItemIcon>
            <ListItemIcon
              onClick={() => {
                setEditTag(tag);
              }}
            >
              <MoreIconWrapper>
                <MoreVertIcon color="inherit" />
              </MoreIconWrapper>
            </ListItemIcon>
          </StyledMenuItem>
        ))}
      </StyledMenuList>
    </TagsListWrapper>
  );

  const renderInput = () => (
    <form onSubmit={handleSubmit}>
      <StyledTextField
        variant="outlined"
        fullWidth
        size="small"
        placeholder="Search or Create New"
        value={inputVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputVal(e.target.value);
        }}
        autoFocus
      />
      {error || canCreateNew ? (
        <>
          <Spacer height={4} />
          <Typography color={error ? "red" : "white"}>
            {error ? error : "Press Enter to create a new Tag"}
          </Typography>
        </>
      ) : null}
    </form>
  );

  if (loading) {
    return renderLoadingState();
  }

  return (
    <>
      {editTag ? (
        <EditTagModal
          tag={editTag}
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditTag(undefined);
          }}
          allTags={[...selectedTags, ...tagsToSelect]}
          onPatchTag={onPatchTag}
          onDeleteTag={onDeleteTag}
        />
      ) : null}
      <TagsWrapper ref={ref}>
        <TagsHeader>
          {renderSelectedChips()}
          {renderInput()}
        </TagsHeader>
        {renderMenu()}
      </TagsWrapper>
    </>
  );
};

interface IInnerChipContent {
  tag: ITag;
  onSetEditTag: (tag: ITag) => void;
}
const renderInnerChipContent = (props: IInnerChipContent) => {
  const { tag, onSetEditTag } = props;

  return (
    <>
      <InnerChipContentWrapper>
        <IconButton
          onClick={() => {
            onSetEditTag(tag);
          }}
        >
          <EditIcon />
        </IconButton>
        <Typography color="white">{tag.label}</Typography>
      </InnerChipContentWrapper>
    </>
  );
};

const InnerChipContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IChip {
  bgcolor: string;
}

const StyledChip = styled(Chip)<IChip>`
  && {
    background-color: ${props => props.bgcolor};
    color: white;
  }

  && svg {
    fill: white;
  }

  & div {
    transform: translateY(-21px);
  }

  &:hover div {
    transform: translateY(12px);
  }
  cursor: pointer;
  overflow: hidden;
  transition: 1s transform ease;
`;
const TagsHeader = styled.div`
  width: 100%;
  background-color: ${BackgroundColor.darker};
  padding: 12px;
`;

const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
const TagsWrapper = styled.div`
  width: 320px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 2;
  background-color: ${BackgroundColor.darker};
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.6);
`;

const TagsListWrapper = styled.div`
  background-color: ${BackgroundColor.dark};
  max-height: 200px;
  overflow: auto;
`;
const StyledTextField = styled(TextField)`
  background-color: white;
  border-radius: 4px;
`;

const StyledListItemText = styled(ListItemText)<IChip>`
  && {
    color: ${props => props.bgcolor};
    font-weight: bold;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoadingAnimation = styled(LoadingAnimation)`
  && {
    fill: white;
    color: white;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  &&& {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 0;
  }
  &&& svg {
    display: none;
  }
  &&&:hover svg {
    display: block;
  }
`;

const StyledMenuList = styled(MenuList)`
  && {
    padding: 0;
  }
`;

const MoreIconWrapper = styled.div`
  color: white;
`;
