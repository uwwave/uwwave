import { BackgroundColor, Color } from "src/styles/color";
import styled from "styled-components";
import { Spacer } from "src/components/Spacer/Spacer";
import { useEffect, useState } from "react";
import {
  InterviewTile,
  RatingTile,
  SalaryTile,
} from "src/components/JobRatingCard/ValueTiles";
import Typography from "@mui/material/Typography";
import { WaveLogo } from "../icons/logo/Navbar";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { JobScoreInfoModal } from "../Modals/variants/JobScoreInfoModal";

interface IJobRatingCard {
  rating: string | null;
  salary: string | null;
  interview: string | null;
  ratingVal: number | null;
  salaryVal: number | null;
  interviewVal: number | null;
}

export const JobRatingCard = (props: IJobRatingCard) => {
  const {
    rating,
    salary,
    interview,
    ratingVal,
    salaryVal,
    interviewVal: scoreVal,
  } = props;
  //needed for animations
  const [ratingValState, setRatingValState] = useState(0);
  const [salaryValState, setSalaryValState] = useState(0);
  const [scoreValState, setScoreValState] = useState(0);
  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    setRatingValState(ratingVal ?? 0);
  }, [ratingVal]);
  useEffect(() => {
    setSalaryValState(salaryVal ?? 0);
  }, [salaryVal]);
  useEffect(() => {
    setScoreValState(scoreVal ?? 0);
  }, [scoreVal]);
  return (
    <>
      <JobScoreInfoModal
        isOpen={infoModal}
        onClose={() => {
          setInfoModal(false);
        }}
        rating={rating}
        salary={salary}
        interview={interview}
      />
      <MainWrapper>
        <HeaderWrapper>
          <WaveLogo color="white" />
          <Typography color="white" align="center">
            Wave Score
          </Typography>
          <HelpButton
            onClick={() => {
              setInfoModal(true);
            }}
          >
            <HelpOutlineIcon />
          </HelpButton>
        </HeaderWrapper>

        <InnerWrapper>
          {ratingVal === null ? (
            <DisabledPillar />
          ) : (
            <Pillar>
              <InnerPillar1 val={ratingValState} />
            </Pillar>
          )}
          {salaryVal === null ? (
            <DisabledPillar />
          ) : (
            <Pillar>
              <InnerPillar2 val={salaryValState} />
            </Pillar>
          )}
          {scoreVal === null ? (
            <DisabledPillar />
          ) : (
            <Pillar>
              <InnerPillar3 val={scoreValState} />
            </Pillar>
          )}
          <div>
            <RatingTile val={rating} />
            <Spacer height={8} />
            <SalaryTile
              val={salary}
              substring={`Top ${(100 - salaryValState).toFixed(1)}%`}
            />
            <Spacer height={8} />
            <InterviewTile val={interview} />
          </div>
        </InnerWrapper>
      </MainWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  padding-bottom: 8px;
  display: flex;
  justify-content: center;
  position: relative;
  gap: 4px;
`;
const MainWrapper = styled.div`
  background-color: ${BackgroundColor.darker};
  border-radius: 8px;
  padding: 8px;
`;
const InnerWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 16px 8px 16px;
  position: relative;
`;

const Pillar = styled.div`
  width: 32px;
  border-radius: 32px;
  background-color: white;
  display: flex;
  flex-direction: column-reverse;
  padding: 4px;
`;

const DisabledPillar = styled.div`
  width: 32px;
  border-radius: 32px;
  background-color: white;
  display: flex;
  flex-direction: column-reverse;
  padding: 4px;
  opacity: 0.42;
`;

interface IInnerPillar {
  val: number;
}
interface IInnerPillar {
  val: number;
}

const InnerPillar1 = styled.div<IInnerPillar>`
  height: ${props => (props.val * 85) / 100 + 15}%;
  width: 100%;
  border-radius: 16px;
  background-color: ${Color.rating};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.8s ease;
`;

const InnerPillar2 = styled.div<IInnerPillar>`
  height: ${props => (props.val * 85) / 100 + 15}%;
  width: 100%;
  border-radius: 16px;
  background-color: ${Color.salary};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.8s ease;
  transition-delay: 0.2s;
`;

const InnerPillar3 = styled.div<IInnerPillar>`
  height: ${props => (props.val * 85) / 100 + 15}%;
  width: 100%;
  border-radius: 16px;
  background-color: ${Color.interview};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.8s ease;
  transition-delay: 0.3s;
`;

const HelpButton = styled(IconButton)`
  && {
    position: absolute;
    right: -8px;
    top: -8px;
    color: white;
  }

  && svg {
    font-size: 20px;
  }

  &&:hover {
    opacity: 1;
  }
`;
