import Typography from "@mui/material/Typography";
import {
  InterviewTile,
  RatingTile,
  SalaryTile,
} from "src/components/JobRatingCard/ValueTiles";
import { BaseModal } from "src/components/Modals/BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
  rating: string | null;
  salary: string | null;
  interview: string | null;
}

export const JobScoreInfoModal = (props: IUploadDomainModal) => {
  const { onClose, isOpen, rating, salary, interview: score } = props;

  return (
    <BaseModal
      open={isOpen}
      hasCloseX
      confirmText="Got It!"
      onCloseModal={onClose}
      onClickOk={onClose}
      dark
    >
      <Typography align="center" variant="h3" color="white">
        <b>Wave Score Breakdown</b>
      </Typography>
      <Spacer height={8} />
      <Typography align="center" color="white" variant="h6">
        Scores are based on user submitted ratings, salaries, and interview
        difficulty
      </Typography>
      <Spacer height={32} />
      <Header>
        <RatingTile val={rating} />
        <HeaderText textColor={"white"}>Rating</HeaderText>
      </Header>
      <Spacer height={16} />
      <Typography color="white">
        Users rate their co-op experiences between 1-5 stars. This is the
        average rating from all reviews from the same company.
      </Typography>
      <Spacer height={16} />
      <Header>
        <SalaryTile val={salary} />
        <HeaderText textColor={"white"}>Salary</HeaderText>
      </Header>
      <Spacer height={16} />
      <Typography color="white">
        This is formulated by comparing salaries from other companies and
        assigning a percentile. The salary range is the minimum and maximum
        hourly rate in CAD
      </Typography>
      <Spacer height={16} />
      <Header>
        <InterviewTile val={score} />
        <HeaderText textColor={"white"}>Interview Difficulty</HeaderText>
      </Header>
      <Spacer height={16} />
      <Typography color="white">
        Users rate their interview experiences between 1-5 stars, with 5 stars
        being the most difficult. This is the average rating from all reviews
        from the same company.
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
    font-weight: bold;
  }
`;
