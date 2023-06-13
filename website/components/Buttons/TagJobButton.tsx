import { SecondaryButton } from "./SecondaryButton";
import { Color } from "src/styles/color";
import styled from "styled-components";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { JobTagsMenu } from "../JobTags/Menu/JobTagsMenu";
import { useTagJobButton } from "src/lib/hooks/useTagJobButton";

interface ITagJobButton {
  jobID: string;
}
export const TagJobButton = (props: ITagJobButton) => {
  const { jobID } = props;
  const {
    hovering,
    setHovering,
    menuOpen,
    setMenuOpen,
    selected,
    buttonText,
    hoveringText,
    iconColor,
  } = useTagJobButton(jobID);

  return (
    <MainWrapper>
      <StyledButton
        selected={selected}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {selected ? (
          <StyledBookmarkIcon sx={{ mr: 1 }} bgcolor={iconColor} />
        ) : (
          <BookmarkBorderIcon sx={{ mr: 1 }} />
        )}
        {hovering ? hoveringText : buttonText}
      </StyledButton>
      {menuOpen ? (
        <TagsMenuWrapper>
          <JobTagsMenu
            jobID={jobID}
            onOutsideClick={() => {
              setMenuOpen(false);
            }}
          />
        </TagsMenuWrapper>
      ) : null}
    </MainWrapper>
  );
};

const TagsMenuWrapper = styled.div`
  position: absolute;
  top: 56px;
  z-index: 2;
`;

const MainWrapper = styled.div`
  position: relative;
`;

interface IStyledButton {
  selected: boolean;
}
const StyledButton = styled(SecondaryButton)<IStyledButton>`
  && {
    background-color: ${props => (props.selected ? Color.tagged : "initial")};
    color: ${props => (props.selected ? "white" : Color.tagged)};
    border-width: ${props => (props.selected ? 0 : "initial")};
    border-color: ${Color.tagged};
    box-shadow: 2px 3px ${Color.taggedShadow};
  }

  &&:hover {
    background-color: ${props => (props.selected ? Color.tagged : "initial")};
  }
`;

interface IBookmarkIcon {
  bgcolor: string;
}
const StyledBookmarkIcon = styled(BookmarkIcon)<IBookmarkIcon>`
  && {
    color: ${props => props.bgcolor};
  }
`;
