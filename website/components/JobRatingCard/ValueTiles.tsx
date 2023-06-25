import { Color } from "src/styles/color";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

interface IScore {
  val: string | null;
  substring?: string;
}

export const RatingTile = ({ val }: IScore) => {
  return (
    <Value color={Color.rating}>
      <StarHalfIconWrapper />
      {val ? (
        <ValueString>
          {val}
          <Typography variant="caption"> /5</Typography>
        </ValueString>
      ) : (
        <Typography color="white">No Data</Typography>
      )}
    </Value>
  );
};

export const SalaryTile = ({ val, substring }: IScore) => {
  const renderValue = () => (
    <SalaryWrapper>
      <SalaryValueString>{val}</SalaryValueString>
      <PercentileText>{substring}</PercentileText>
    </SalaryWrapper>
  );
  return (
    <Value color={Color.salary}>
      <MoneyIconWrapper />
      {val ? renderValue() : <Typography color="white">No Data</Typography>}
    </Value>
  );
};

export const InterviewTile = ({ val }: IScore) => {
  const renderValue = () => (
    <div>
      <ValueString>
        {val}
        <Typography variant="caption"> /5</Typography>
      </ValueString>
    </div>
  );
  return (
    <Value color={Color.interview}>
      <InterviewIcon />
      {val ? renderValue() : <Typography color="white">No Data</Typography>}
    </Value>
  );
};

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

const ValueString = styled(Typography).attrs({
  variant: "h6",
})`
  && {
    color: white;
    font-weight: bold;
    text-wrap: nowrap;
  }
`;

const InterviewIcon = styled(VideoCameraFrontIcon)`
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

const SalaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const PercentileText = styled(Typography).attrs({
  color: "white",
  variant: "caption",
  align: "right",
})`
  && {
    text-wrap: nowrap;
    transform: translateY(-25%);
  }
`;

const SalaryValueString = styled(Typography).attrs({
  variant: "h6",
})`
  && {
    color: white;
    font-weight: bold;
    transform: translateY(2px);
    text-wrap: nowrap;
  }
`;
