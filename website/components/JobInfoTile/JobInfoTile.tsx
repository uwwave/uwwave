import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

interface IJobInfoTile {
  icon: React.ReactNode;
  title: string;
  value: string;
  subValue?: string;
}
export const JobInfoTile = (props: IJobInfoTile) => {
  const { icon, title, value, subValue } = props;
  const useTooltip = value.length > 20;
  const valueString = useTooltip ? `${value.substring(0, 18)}...` : value;
  return (
    <div>
      <TitleWrapper>
        {icon}
        <Typography color="gray" variant="subtitle2">
          {title}
        </Typography>
      </TitleWrapper>
      {useTooltip ? (
        <TooltipWrapper title={<Typography>{value}</Typography>} arrow>
          <Typography variant="h5">
            <b>{valueString}</b>
          </Typography>
        </TooltipWrapper>
      ) : (
        <Typography variant="h5">
          <b>{valueString}</b>
        </Typography>
      )}
      {subValue ? (
        <Typography variant="subtitle2">{subValue}</Typography>
      ) : null}
    </div>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: -4px;

  && svg {
    fill: gray;
  }
`;

const TooltipWrapper = styled(Tooltip)`
  cursor: pointer;
  .MuiTooltip-arrow {
    color: #ff0000; /* Set the arrow color here */
  }
`;
