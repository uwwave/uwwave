import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

interface IIconButtonCounter {
  Icon: React.ReactNode;
  val: number;
  onClick?: () => void;
}

export const IconButtonCounter = ({
  val,
  Icon,
  onClick,
}: IIconButtonCounter) => {
  return (
    <IconButton onClick={onClick}>
      <InnerIcon>
        <IconWrapper>{Icon}</IconWrapper>
        <StyledButtonLabel>{val > 0 ? val : "."}</StyledButtonLabel>
      </InnerIcon>
    </IconButton>
  );
};

const InnerIcon = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

const IconWrapper = styled.div`
  && svg {
    font-size: 2rem;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledButtonLabel = styled(Typography).attrs({
  variant: "caption",
})`
  && {
    color: white;
    position: relative;
    top: -3px;
  }
`;
