import { BackgroundColor, Color } from "src/styles/color";
import styled from "styled-components";
import { Spacer } from "src/components/Spacer/Spacer";
import ExtensionIcon from "@mui/icons-material/Extension";
import Typography from "@mui/material/Typography";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
  return (
    <MainWrapper>
      <Pillar>
        <InnerPillar1 val={ratingVal} />
      </Pillar>
      <Pillar>
        <InnerPillar2 val={salaryVal} />
      </Pillar>
      <Pillar>
        <InnerPillar3 val={scoreVal} />
      </Pillar>
      <div>
        <Value color={Color.rating}>
          <StarHalfIconWrapper />
          <ValueString>{rating}</ValueString>
        </Value>
        <Spacer height={8} />
        <Value color={Color.salary}>
          <MoneyIconWrapper />
          <ValueString>{salary}</ValueString>
        </Value>
        <Spacer height={8} />
        <Value color={Color.compatibility}>
          <ExtensionIconWrapper />
          <ValueString>{score}</ValueString>
        </Value>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  padding: 24px;
  background-color: ${BackgroundColor.darker};
  border-radius: 16px;
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
`;

interface IValue {
  color: string;
}
const Value = styled.div<IValue>`
  width: 128px;
  height: calc(34% - 7px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.color};
  border-radius: 4px;
  padding: 8px;
`;

const ExtensionIconWrapper = styled(ExtensionIcon)`
  && {
    fill: white;
    font-size: 40px;
  }
`;

const StarHalfIconWrapper = styled(StarHalfIcon)`
  && {
    fill: white;
    font-size: 40px;
  }
`;

const MoneyIconWrapper = styled(AttachMoneyIcon)`
  && {
    fill: white;
    font-size: 40px;
  }
`;

const ValueString = styled(Typography).attrs({
  variant: "h6",
})`
  && {
    color: white;
    font-weight: bold;
  }
`;
