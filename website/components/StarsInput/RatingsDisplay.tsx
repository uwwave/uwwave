import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { StarsInput } from "src/components/StarsInput/StarsInput";
import { Color } from "src/styles/color";

interface IRatingsDisplay {
  mentorshipVal: number;
  workLifeVal: number;
  meaningfulVal: number;
  light?: boolean;
}
export const RatingsDisplay = ({
  mentorshipVal,
  workLifeVal,
  meaningfulVal,
  light,
}: IRatingsDisplay) => {
  return (
    <MainWrapper>
      <Row>
        <Typography variant="caption" color={light ? "white" : undefined}>
          Mentorship
        </Typography>
        <StarsInput value={mentorshipVal} color={Color.rating} starsSize={16} />
      </Row>
      <Row>
        <Typography variant="caption" color={light ? "white" : undefined}>
          Work-Life balance
        </Typography>
        <StarsInput value={workLifeVal} color={Color.rating} starsSize={16} />
      </Row>
      <Row>
        <Typography variant="caption" color={light ? "white" : undefined}>
          Meaningful work
        </Typography>
        <StarsInput value={meaningfulVal} color={Color.rating} starsSize={16} />
      </Row>
    </MainWrapper>
  );
};

const MainWrapper = styled.div``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  max-width: 190px;
`;
