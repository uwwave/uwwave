import { useState, useMemo } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface IStarsInput {
  color: string;
  value: number;
  onValue: (data: number) => void;
}
export const StarsInput = ({ color, value, onValue }: IStarsInput) => {
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
              fillColor={color}
              key={i}
              onClick={() => {
                setStars(i + 1);
                onValue(i + 1);
              }}
            />
          );
        }

        return (
          <OutlineStar
            fillColor={color}
            key={i}
            onClick={() => {
              setStars(i + 1);
              onValue(i + 1);
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
}
const FilledStar = styled(StarIcon)<IStar>`
  && {
    font-size: 40px;
    color: ${props => props.fillColor};
    cursor: pointer;
  }
`;

const OutlineStar = styled(StarBorderIcon)<IStar>`
  && {
    font-size: 40px;
    color: ${props => props.fillColor};
    cursor: pointer;
  }
`;
