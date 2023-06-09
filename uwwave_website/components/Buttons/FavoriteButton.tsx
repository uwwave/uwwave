import { SecondaryButton } from "./SecondaryButton";
import { Color } from "src/styles/color";
import styled from "styled-components";
import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface IFavoriteButton {
  selected: boolean;
  onClick: () => void;
}
export const FavoriteButton = (props: IFavoriteButton) => {
  const { selected, onClick } = props;

  const [hovering, setHovering] = useState(false);

  return (
    <StyledButton
      selected={selected}
      onMouseEnter={() => {
        selected && setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={onClick}
    >
      {selected ? (
        <BookmarkIcon sx={{ mr: 1 }} />
      ) : (
        <BookmarkBorderIcon sx={{ mr: 1 }} />
      )}
      {selected ? (hovering ? "Remove" : "Bookmarked") : "Bookmark"}
    </StyledButton>
  );
};

const StyledButton = styled(SecondaryButton)<IFavoriteButton>`
  && {
    background-color: ${props =>
      props.selected ? Color.bookmarked : "initial"};
    color: ${props => (props.selected ? "white" : Color.bookmarked)};
    border-width: ${props => (props.selected ? 0 : "initial")};
    border-color: ${Color.bookmarked};
    box-shadow: 2px 3px ${Color.bookmarkedShadow};
  }
`;
