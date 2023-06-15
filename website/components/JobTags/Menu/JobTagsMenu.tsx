import TextField from "@mui/material/TextField";
import { Spacer } from "src/components/Spacer/Spacer";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckIcon from "@mui/icons-material/Check";
import { BackgroundColor } from "src/styles/color";
import styled from "styled-components";
import { useTagsMenu } from "src/lib/hooks/useTagsMenu";
import LoadingAnimation from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditTagModal } from "src/components/Modals/variants/EditTagModal";
import { IconColorWrapper } from "src/components/icons/ColorWrapper";
import { TagChip } from "src/components/Tags/Chips/TagChip";

interface ITagsMenu {
  onOutsideClick: () => void;
  jobID: string;
}
export const JobTagsMenu = (props: ITagsMenu) => {
  const { onOutsideClick, jobID } = props;
  const {
    loading,
    displaySelectedTags,
    displayTagsToSelect,
    selectTag,
    removeTag,
    inputVal,
    setInputVal,
    canCreateNew,
    onSubmit,
    error,
    setEditTag,
    isEditModalOpen,
    tagToJobsCount,
  } = useTagsMenu(jobID);
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
        {displaySelectedTags.map(tag => (
          <TagChip
            tag={tag}
            onDelete={() => {
              removeTag(tag.label);
            }}
          />
        ))}
      </ChipsWrapper>
      {displaySelectedTags.length > 0 ? <Spacer height={8} /> : null}
    </>
  );

  const renderMenu = () => (
    <TagsListWrapper>
      <StyledMenuList>
        {displayTagsToSelect.map(tag => (
          <StyledMenuItem key={tag.label}>
            <StyledListItemText
              bgcolor={tag.color}
              onClick={() => {
                selectTag(tag.label);
              }}
            >
              {`${tag.label}${
                tagToJobsCount[tag.label]
                  ? ` (${tagToJobsCount[tag.label]})`
                  : ""
              }`}
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
                setEditTag(tag.label);
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
      <EditTagModal />
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

interface IChip {
  bgcolor: string;
}

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
