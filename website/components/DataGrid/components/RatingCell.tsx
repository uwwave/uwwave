import React from "react";
import styled from "styled-components";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import { Color } from "src/styles/color";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface IRatingsCell {
  ratingPercentage: number | null;
  moneyPercentage: number | null;
  interviewPercentage: number | null;
}
export const RatingsCell = (props: IRatingsCell) => {
  const { ratingPercentage, moneyPercentage, interviewPercentage } = props;

  const renderTooltipContent = () => (
    <>
      <Typography align="center">
        <b>Averages</b>
      </Typography>
      <Typography>{`Rating: ${
        ratingPercentage
          ? `${(ratingPercentage / 20).toFixed(1)} / 5`
          : "No Data"
      }`}</Typography>
      <Typography>{`Salary: ${
        moneyPercentage
          ? `Top ${(100 - moneyPercentage).toFixed(1)}%`
          : "No Data"
      }`}</Typography>
      <Typography>{`Interview Difficulty: ${
        interviewPercentage
          ? `${(interviewPercentage / 20).toFixed(1)} / 5`
          : "No Data"
      }`}</Typography>
    </>
  );
  return (
    <StyledTooltip title={renderTooltipContent()} arrow placement="top">
      <StatsWrapper>
        <Pillar disabled={!ratingPercentage}>
          <InnerPillar1 val={ratingPercentage ?? 0}>
            <RatingIcon />
          </InnerPillar1>
        </Pillar>
        <Pillar disabled={!moneyPercentage}>
          <InnerPillar2 val={moneyPercentage ?? 0}>
            <MoneyIcon />
          </InnerPillar2>
        </Pillar>
        <Pillar disabled={!interviewPercentage}>
          <InnerPillar3 val={interviewPercentage ?? 0}>
            <InterviewIcon />
          </InnerPillar3>
        </Pillar>
      </StatsWrapper>
    </StyledTooltip>
  );
};

const StyledTooltip = styled(Tooltip)`
  cursor: pointer;
`;
const StatsWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

interface IPillarWrapper {
  disabled: boolean;
}
const Pillar = styled.div<IPillarWrapper>`
  height: 64px;
  width: 16px;
  border-radius: 16px;
  background-color: #ddd;
  display: flex;
  flex-direction: column-reverse;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

interface IPillar {
  val: number;
}

const InnerPillar1 = styled.div<IPillar>`
  height: ${props => (props.val * 70) / 100 + 30}%;
  min-height: 30%;
  width: 16px;
  border-radius: 16px;
  background-color: ${Color.rating};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
`;

const InnerPillar2 = styled.div<IPillar>`
  height: ${props => (props.val * 70) / 100 + 30}%;
  min-height: 30%;
  width: 16px;
  border-radius: 16px;
  background-color: ${Color.salary};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
`;

const InnerPillar3 = styled.div<IPillar>`
  height: ${props => (props.val * 70) / 100 + 30}%;
  min-height: 30%;
  width: 16px;
  border-radius: 16px;
  background-color: ${Color.interview};
  flex-direction: column-reverse;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
`;

const MoneyIcon = styled(AttachMoneyIcon)`
  && {
    fill: white;
    width: 16px;
    position: relative;
    bottom: -2px;
  }
`;

const RatingIcon = styled(StarIcon)`
  && {
    fill: white;
    width: 16px;
    position: relative;
    bottom: -2px;
  }
`;

const InterviewIcon = styled(VideoCameraFrontIcon)`
  && {
    fill: white;
    width: 13px;
    position: relative;
    bottom: -2px;
  }
`;
