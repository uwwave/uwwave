import Typography from "@mui/material/Typography";
import {
  CompatibilityTile,
  RatingTile,
  SalaryTile,
} from "src/components/JobRatingCard/ValueTiles";
import { BaseModal } from "src/components/Modals/BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import { Color } from "src/styles/color";
import styled from "styled-components";

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
  rating: string;
  salary: string;
  score: string;
}

export const JobScoreInfoModal = (props: IUploadDomainModal) => {
  const { onClose, isOpen, rating, salary, score } = props;

  return (
    <BaseModal
      open={isOpen}
      hasCloseX
      confirmText="Got It!"
      onCloseModal={onClose}
      onClickOk={onClose}
    >
      <Typography align="center" variant="h4">
        <b>Job Score Breakdown</b>
      </Typography>
      <Spacer height={8} />
      <Typography align="center">
        We score jobs based on user reviews, salaries, and compatibility based
        on data submitted by you!
      </Typography>
      <Spacer height={32} />
      <Header>
        <RatingTile val={rating} />
        <HeaderText textColor={Color.rating}>Rating</HeaderText>
      </Header>
      <Spacer height={16} />
      <Typography>
        This is some text where we explain how we calculate the overall rating
        for this score. We'll go in more depth so the user has better
        understanding.
      </Typography>
      <Spacer height={16} />
      <Header>
        <SalaryTile val={salary} />
        <HeaderText textColor={Color.salary}>Salary</HeaderText>
      </Header>
      <Spacer height={16} />
      <Typography>
        This is some text where we explain how we calculate the overall rating
        for this score. We'll go in more depth so the user has better
        understanding
      </Typography>
      <Spacer height={16} />
      <Header>
        <CompatibilityTile val={score} />
        <HeaderText textColor={Color.compatibility}>Match</HeaderText>
      </Header>
      <Spacer height={16} />
      <Typography>
        This is some text where we explain how we calculate the overall rating
        for this score. We'll go in more depth so the user has better
        understanding
      </Typography>
      <Spacer height={16} />
    </BaseModal>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

interface IHeaderText {
  textColor: string;
}
const HeaderText = styled(Typography).attrs({
  variant: "h4",
})<IHeaderText>`
  && {
    color: ${props => props.textColor};
  }
`;
