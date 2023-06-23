import styled from "styled-components";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { BackgroundColor, Color } from "src/styles/color";
import { useUserContext } from "src/lib/context/User/UserContext";
import { VoteState } from "src/lib/hooks/useCompanyReviewsDataGrid";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";

interface IHelpfulCell {
  voteState: VoteState;
  upvoteCount: number;
  downvoteCount: number;
  reviewID: string;
  onUpvote: (reviewID: string) => void;
  onDownvote: (reviewID: string) => void;
  disabled?: boolean;
}
export const HelpfulCell = ({
  upvoteCount,
  downvoteCount,
  reviewID,
  onUpvote,
  onDownvote,
  voteState,
  disabled,
}: IHelpfulCell) => {
  const { user } = useUserContext();
  const { open } = useLoginModalContext();

  const upvoteHighlighted = voteState === VoteState.UP;
  const downvoteHighlighted = voteState === VoteState.DOWN;

  const onClickUpvote = () => {
    // don't let users who are not logged in vote
    if (!user?.id) {
      open();
      return;
    }
    //update the global state
    onUpvote(reviewID);
  };

  const onClickDownvote = () => {
    // don't let users who are not logged in vote
    if (!user?.id) {
      open();
      return;
    }
    //update the global state
    onDownvote(reviewID);
  };

  return (
    <Main>
      <StyledButton
        size="small"
        startIcon={<ThumbUpIcon />}
        highlighted={upvoteHighlighted}
        margin={disabled ? true : !!upvoteCount}
        onClick={onClickUpvote}
        disabled={disabled}
        fillcolor={disabled ? BackgroundColor.dark : Color.rating}
      >
        {upvoteCount > 0 || disabled ? upvoteCount : ""}
      </StyledButton>
      <StyledButton
        size="small"
        startIcon={<ThumbDownIcon />}
        highlighted={downvoteHighlighted}
        margin={disabled ? true : !!upvoteCount}
        onClick={onClickDownvote}
        disabled={disabled}
        fillcolor={disabled ? BackgroundColor.dark : Color.rating}
      >
        {downvoteCount > 0 || disabled ? downvoteCount : ""}
      </StyledButton>
    </Main>
  );
};

const Main = styled.div`
  display: flex;

  align-items: center;
`;

interface IStyledButton {
  highlighted: boolean;
  margin: boolean;
  fillcolor: string;
}
const StyledButton = styled(Button)<IStyledButton>`
  && {
    padding: 4px;
    min-width: 0;
    gap: 0;
    background-color: ${props =>
      props.highlighted ? props.fillcolor : "none"};
    color: ${props => (props.highlighted ? "white" : props.fillcolor)};
  }

  && span {
    margin: 0;
    margin-right: ${props => (props.margin ? 4 : 0)}px;
  }
`;
