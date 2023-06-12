import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { calculateDaysFromNow } from "src/lib/dates/dates";

interface IDeadlineCell {
  dateString: string;
}
export const DeadlineCell = (props: IDeadlineCell) => {
  const { dateString } = props;
  const daysFromNow = calculateDaysFromNow(new Date("july 12 2023"));
  if (daysFromNow.split(" ").length === 2) {
    const date = dateString.split(",")[0];
    return (
      <Main>
        <Typography variant="caption" align="center">
          {date}
        </Typography>
      </Main>
    );
  }
  return (
    <Main>
      <Typography>
        <b>{daysFromNow}</b>
      </Typography>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
