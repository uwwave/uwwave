import { Color } from "src/styles/color";
import styled from "styled-components";
import ExtensionIcon from "@mui/icons-material/Extension";
import Typography from "@mui/material/Typography";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface IScore {
  val: string;
}

export const RatingTile = ({ val }: IScore) => {
  return (
    <Value color={Color.rating}>
      <StarHalfIconWrapper />
      <ValueString>{val}</ValueString>
    </Value>
  );
};

export const SalaryTile = ({ val }: IScore) => {
  return (
    <Value color={Color.salary}>
      <MoneyIconWrapper />
      <ValueString>{val}</ValueString>
    </Value>
  );
};

export const CompatibilityTile = ({ val }: IScore) => {
  return (
    <Value color={Color.compatibility}>
      <ExtensionIconWrapper />
      <ValueString>{val}</ValueString>
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
  }
`;

const ExtensionIconWrapper = styled(ExtensionIcon)`
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
