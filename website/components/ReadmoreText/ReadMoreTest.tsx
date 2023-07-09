import { useState } from "react";
import { TertiaryButton } from "../Buttons/TertiaryButton";

interface IReadMoreText {
  max: number;
  text: string;
}

export const ReadMoreText = ({ max, text }: IReadMoreText) => {
  const [seeReadMore, setSeeReadMore] = useState<boolean>(false);
  if (text.length > max) {
    if (seeReadMore) {
      return (
        <>
          {`${text}    `}
          <TertiaryButton
            text="Read Less"
            onClick={() => {
              setSeeReadMore(false);
            }}
          />
        </>
      );
    } else {
      return (
        <>
          {`${text.substring(0, max)}...   `}
          <TertiaryButton
            underline
            text="Read More"
            onClick={() => {
              setSeeReadMore(true);
            }}
            marginTop={-4}
          />
        </>
      );
    }
  }
  return <>{text}</>;
};
