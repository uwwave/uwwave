import React from "react";
import styled from "styled-components";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import { Color } from "src/styles/color";

interface IRatingsCell {
  ratingPercentage: number;
  moneyPercentage: number;
  scorePercenatge: number;
}
export const RatingsCell = (props: IRatingsCell) => {
  const { ratingPercentage, moneyPercentage, scorePercenatge } = props;
  return (
    <StatsWrapper>
      <Pillar>
        <InnerPillar1 val={ratingPercentage}>
          <RatingIcon />
        </InnerPillar1>
      </Pillar>
      <Pillar>
        <InnerPillar2 val={moneyPercentage}>
          <MoneyIcon />
        </InnerPillar2>
      </Pillar>
      <Pillar>
        <InnerPillar3 val={scorePercenatge}>
          <ScoreIcon />
        </InnerPillar3>
      </Pillar>
    </StatsWrapper>
  );
};

const StatsWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Pillar = styled.div`
  height: 64px;
  width: 16px;
  border-radius: 16px;
  background-color: #ddd;
  display: flex;
  flex-direction: column-reverse;
`;

interface IPillar {
  val: number;
}

const InnerPillar1 = styled.div<IPillar>`
  height: ${props => props.val}%;
  min-height: 32%;
  width: 16px;
  border-radius: 16px;
  background-color: ${Color.rating};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
`;

const InnerPillar2 = styled.div<IPillar>`
  height: ${props => props.val}%;
  min-height: 32%;
  width: 16px;
  border-radius: 16px;
  background-color: ${Color.salary};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
`;

const InnerPillar3 = styled.div<IPillar>`
  height: ${props => props.val}%;
  min-height: 32%;
  width: 16px;
  border-radius: 16px;
  background-color: ${Color.compatibility};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
`;

const MoneyIcon = styled(AttachMoneyIcon)`
  && {
    fill: white;
    width: 16px;
  }
`;

const RatingIcon = styled(StarIcon)`
  && {
    fill: white;
    width: 16px;
  }
`;

const ScoreIcon = styled(SearchIcon)`
  && {
    fill: white;
    width: 16px;
  }
`;
