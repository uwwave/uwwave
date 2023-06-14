import { BackgroundColor, Color } from "src/styles/color";
import styled from "styled-components";
import { Spacer } from "src/components/Spacer/Spacer";
import { useEffect, useState } from "react";
import {
  CompatibilityTile,
  RatingTile,
  SalaryTile,
} from "src/components/JobRatingCard/ValueTiles";

interface IJobRatingCard {
  rating: string;
  salary: string;
  score: string;
  ratingVal: number;
  salaryVal: number;
  scoreVal: number;
}

export const JobRatingCard = (props: IJobRatingCard) => {
  const { rating, salary, score, ratingVal, salaryVal, scoreVal } = props;
  const [ratingValState, setRatingValState] = useState(0);
  const [salarayValState, setSalaryValState] = useState(0);
  const [scoreValState, setScoreValState] = useState(0);

  useEffect(() => {
    setRatingValState(ratingVal);
  }, [ratingVal]);
  useEffect(() => {
    setSalaryValState(salaryVal);
  }, [salaryVal]);
  useEffect(() => {
    setScoreValState(scoreVal);
  }, [scoreVal]);
  return (
    <MainWrapper>
      <Pillar>
        <InnerPillar1 val={ratingValState} />
      </Pillar>
      <Pillar>
        <InnerPillar2 val={salarayValState} />
      </Pillar>
      <Pillar>
        <InnerPillar3 val={scoreValState} />
      </Pillar>
      <div>
        <RatingTile val={rating} />
        <Spacer height={8} />
        <SalaryTile val={salary} />
        <Spacer height={8} />
        <CompatibilityTile val={score} />
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  padding: 24px;
  background-color: ${BackgroundColor.darker};
  border-radius: 8px;
  display: flex;
  gap: 16px;
`;

const Pillar = styled.div`
  height: 100%;
  width: 32px;
  border-radius: 32px;
  background-color: white;
  display: flex;
  flex-direction: column-reverse;
  padding: 4px;
`;
interface IInnerPillar {
  val: number;
}
interface IInnerPillar {
  val: number;
}

const InnerPillar1 = styled.div<IInnerPillar>`
  height: ${props => Math.max(10, props.val)}%;
  width: 100%;
  border-radius: 16px;
  background-color: ${Color.rating};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.8s ease;
`;

const InnerPillar2 = styled.div<IInnerPillar>`
  height: ${props => Math.max(10, props.val)}%;
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
  height: ${props => Math.max(10, props.val)}%;
  width: 100%;
  border-radius: 16px;
  background-color: ${Color.compatibility};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.8s ease;
  transition-delay: 0.3s;
`;
