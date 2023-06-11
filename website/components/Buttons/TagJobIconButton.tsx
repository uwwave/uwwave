import { BackgroundColor } from "src/styles/color";
import styled from "styled-components";
import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkOutlineIcon from "@mui/icons-material/BookmarkBorder";
import { JobTagsMenu } from "../JobTags/Menu/JobTagsMenu";
import { ITag } from "src/lib/requests/ExtensionRequests";
import { useTagJobButton } from "src/lib/hooks/useTagJobButton";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface ITagJobButton {
  selectedTags: ITag[];
}
export const TagJobIconButton = (props: ITagJobButton) => {
  const { selectedTags } = props;
  const {
    menuOpen,
    setMenuOpen,
    setSelectedTags,
    selectedTags: userSelectedTags,
    setUserTagsToSelect,
    userTagsToSelect,
  } = useTagJobButton(selectedTags);

  const onSetSelectedTags = (tags: ITag[]) => {
    setSelectedTags(tags);
  };

  const onSetTagsToSelect = (tags: ITag[]) => {
    setUserTagsToSelect(tags);
  };

  return (
    <MainWrapper>
      {userSelectedTags.length === 0 ? (
        <IconButton
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <StyledBookmarkOutlineIcon />
        </IconButton>
      ) : null}
      {userSelectedTags.length > 0 ? (
        <IconButton
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <InnerIcon>
            <StyledBookmarkIcon bgcolor={userSelectedTags[0].color} />
            <StyledButtonLabel>{userSelectedTags.length}</StyledButtonLabel>
          </InnerIcon>
        </IconButton>
      ) : null}

      {menuOpen ? (
        <TagsMenuWrapper>
          <JobTagsMenu
            selectedTags={userSelectedTags}
            tagsToSelect={userTagsToSelect}
            onOutsideClick={() => {
              setUserTagsToSelect(undefined);
              setMenuOpen(false);
            }}
            onSetSelectedTags={onSetSelectedTags}
            onSetTagsToSelect={onSetTagsToSelect}
          />
        </TagsMenuWrapper>
      ) : null}
    </MainWrapper>
  );
};

const InnerIcon = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

const TagsMenuWrapper = styled.div`
  position: absolute;
  top: 40px;
  z-index: 2;
  right: 0;
`;

const MainWrapper = styled.div`
  position: relative;
`;
interface IBookmarkIcon {
  bgcolor: string;
}
const StyledBookmarkIcon = styled(BookmarkIcon)<IBookmarkIcon>`
  && {
    color: ${BackgroundColor.darker};
    font-size: 2rem;
    filter: drop-shadow(3px -3px 0 ${props => props.bgcolor});
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const StyledBookmarkOutlineIcon = styled(BookmarkOutlineIcon)`
  && {
    color: ${BackgroundColor.darker};
    font-size: 1.82rem;
  }
`;

const StyledButtonLabel = styled(Typography).attrs({
  variant: "caption",
})`
  && {
    color: white;
    position: relative;
    top: -3px;
  }
`;
