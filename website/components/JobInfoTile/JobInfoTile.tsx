import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

interface IJobInfoTile {
  icon: React.ReactNode;
  title: string;
  value: string;
  subValue?: string;
  alignLeft?: boolean;
}
export const JobInfoTile = (props: IJobInfoTile) => {
  const { icon, title, value, subValue, alignLeft } = props;
  const useTooltip = value.length > 20;
  const valueString = useTooltip ? `${value.substring(0, 18)}...` : value;
  return (
    <div>
      <TitleWrapper alighLeft={alignLeft}>
        {icon}
        <Typography
          color="gray"
          variant="subtitle2"
          align={alignLeft ? "left" : "right"}
        >
          {title}
        </Typography>
      </TitleWrapper>
      {useTooltip ? (
        <TooltipWrapper title={<Typography>{value}</Typography>} arrow>
          <Typography variant="h5" align={alignLeft ? "left" : "right"}>
            <b>{valueString}</b>
          </Typography>
        </TooltipWrapper>
      ) : (
        <Typography variant="h5" align={alignLeft ? "left" : "right"}>
          <b>{valueString}</b>
        </Typography>
      )}
      {subValue ? (
        <Typography variant="subtitle2" align={alignLeft ? "left" : "right"}>
          {subValue}
        </Typography>
      ) : null}
    </div>
  );
};

interface ITitleWrapper {
  alighLeft?: boolean;
}
const TitleWrapper = styled.div<ITitleWrapper>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.alighLeft ? "start" : "end")};
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
