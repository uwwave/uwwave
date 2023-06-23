import { useState, useMemo } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface IStarsInput {
  color: string;
  value: number;
  onValue?: (data: number) => void;
  starsSize?: number;
}
export const StarsInput = ({
  color,
  value,
  onValue,
  starsSize,
}: IStarsInput) => {
  const canChangeValue = !!onValue;
  const [stars, setStars] = useState(value);
  const starsArr: number[] = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < stars; i++) {
      out.push(1);
    }
    for (let i = stars; i < 5; i++) {
      out.push(0);
    }
    return out;
  }, [stars]);
  return (
    <MainWrapper>
      {starsArr.map((x, i) => {
        if (x === 1) {
          return (
            <FilledStar
              starSize={starsSize ?? 40}
              fillColor={color}
              key={i}
              onClick={() => {
                if (canChangeValue) {
                  setStars(i + 1);
                  onValue(i + 1);
                }
              }}
            />
          );
        }

        return (
          <OutlineStar
            starSize={starsSize ?? 40}
            fillColor={color}
            key={i}
            onClick={() => {
              if (canChangeValue) {
                setStars(i + 1);
                onValue(i + 1);
              }
            }}
          />
        );
      })}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface IStar {
  fillColor: string;
  starSize: number;
}
const FilledStar = styled(StarIcon)<IStar>`
  && {
    font-size: ${props => props.starSize}px;
    color: ${props => props.fillColor};
    cursor: pointer;
  }
`;

const OutlineStar = styled(StarBorderIcon)<IStar>`
  && {
    font-size: ${props => props.starSize}px;
    color: ${props => props.fillColor};
    cursor: pointer;
  }
`;
