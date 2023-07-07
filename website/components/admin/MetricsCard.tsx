import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Spacer } from "src/components/Spacer/Spacer";
import Tooltip from "@mui/material/Tooltip";

interface IMetricsCard {
  title: string;
  value: number;
  goal?: number;
  startingValue?: number;
  description?: string;
}
export const MetricsCard = ({
  title,
  value,
  goal,
  startingValue,
  description,
}: IMetricsCard) => {
  const renderGoal = () => {
    if (!goal) {
      return null;
    }
    const percentage = Math.floor(
      ((value - (startingValue ?? 0)) / goal) * 100
    );
    const progressBarPercentage = Math.min(100, percentage);
    return (
      <>
        <GoalWrapper>
          <Typography align="center" color="gray">{`Start: ${
            startingValue ?? 0
          }`}</Typography>
          <Typography align="center" color="gray">{`Goal: ${goal}`}</Typography>
        </GoalWrapper>

        <Spacer height={4} />
        <BorderLinearProgress
          value={progressBarPercentage}
          variant="determinate"
        />
        <Spacer height={4} />
        <StyledTypography
          align="center"
          fillColor={getProgressColor(percentage)}
        >{`${percentage}%`}</StyledTypography>
      </>
    );
  };

  const renderValue = () => {
    if (!description) {
      return (
        <Typography variant="h2" align="center">
          <b>{value}</b>
        </Typography>
      );
    }

    return (
      <Tooltip
        title={description ? <Typography>{description}</Typography> : undefined}
        arrow
      >
        <HoverTypography variant="h2" align="center">
          <b>{value}</b>
        </HoverTypography>
      </Tooltip>
    );
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">{title}</Typography>

        {renderValue()}

        <Spacer height={16} />
        {renderGoal()}
      </CardContent>
    </Card>
  );
};

const getProgressColor = (value: number): string => {
  if (value < 25) {
    return "#c0392b";
  } else if (value < 50) {
    return "#e67e22";
  } else if (value < 75) {
    return "#f1c40f";
  } else if (value < 90) {
    return "#48dbfb";
  }
  return "#2ecc71";
};

const BorderLinearProgress = styled(LinearProgress)(props => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ddd",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: getProgressColor(props.value ?? 0),
  },
}));

interface IStyledTypography {
  fillColor: string;
}
const StyledTypography = styled(Typography)<IStyledTypography>`
  && {
    color: ${props => props.fillColor};
  }
`;

const GoalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HoverTypography = styled(Typography)`
  && {
    cursor: pointer;
  }
`;
