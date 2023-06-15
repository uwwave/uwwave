import { BackgroundColor } from "src/styles/color";
import styled from "styled-components";
import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkOutlineIcon from "@mui/icons-material/BookmarkBorder";
import { JobTagsMenu } from "../JobTags/Menu/JobTagsMenu";
import { useTagJobButton } from "src/lib/hooks/useTagJobButton";
import IconButton from "@mui/material/IconButton";
import { IconButtonCounter } from "./IconButtonCounter";

interface ITagJobIconButton {
  jobID: string;
  pageSize: number;
}
export const TagJobIconButton = (props: ITagJobIconButton) => {
  const { jobID } = props;
  const {
    menuOpen,
    setMenuOpen,
    selectedTags: userSelectedTags,
    iconColor,
  } = useTagJobButton(jobID);

  return (
    <MainWrapper className="tag-job-icon-button">
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
        <IconButtonCounter
          onClick={() => {
            setMenuOpen(true);
          }}
          Icon={<StyledBookmarkIcon bgcolor={iconColor} />}
          val={userSelectedTags.length}
        />
      ) : null}

      {menuOpen ? (
        <TagsMenuWrapper className="tags-menu-wrapper">
          <JobTagsMenu
            onOutsideClick={() => {
              setMenuOpen(false);
            }}
            jobID={jobID}
          />
        </TagsMenuWrapper>
      ) : null}
    </MainWrapper>
  );
};

const TagsMenuWrapper = styled.div`
  position: absolute;
  top: 40px;
  z-index: 2;
  right: 0;
`;

const MainWrapper = styled.div`
  position: relative;
}
`;
interface IBookmarkIcon {
  bgcolor: string;
}
export const StyledBookmarkIcon = styled(BookmarkIcon)<IBookmarkIcon>`
  && {
    color: ${BackgroundColor.darker};
    font-size: 2rem;
    filter: drop-shadow(3px -3px 0 ${props => props.bgcolor});
  }
`;
const StyledBookmarkOutlineIcon = styled(BookmarkOutlineIcon)`
  && {
    color: ${BackgroundColor.darker};
    font-size: 1.82rem;
  }
`;
