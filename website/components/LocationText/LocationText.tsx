import { getCountryFlag } from "src/components/CountryFlag/CountryFlag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Spacer } from "../Spacer/Spacer";
import Tooltip from "@mui/material/Tooltip";

export enum Orientation {
  "vertical",
  "horizontal",
}
interface IlocationText {
  city?: string;
  province?: string;
  country?: string;
  icon?: boolean;
  orientation?: Orientation;
}

export const LocationText = (props: IlocationText) => {
  const { city, province, country, icon, orientation } = props;

  const countryFlag = getCountryFlag(country ?? "");
  const orient = orientation ?? Orientation.horizontal;
  const isHorizontal = orient === Orientation.horizontal;
  return (
    <LocationWrapper orientation={orient}>
      {icon ? <IconWrapper /> : null}
      <Typography
        align={isHorizontal ? "left" : "center"}
        variant={!isHorizontal ? "caption" : "subtitle2"}
        color="gray"
        lineHeight={"0.8rem"}
      >
        {`${city ?? ""} ${province ? `, ${province}` : ""}${
          !countryFlag ? `${country ? `, ${country}` : ""}` : ""
        }`}
      </Typography>
      <Spacer width={isHorizontal ? 4 : 0} height={!isHorizontal ? 4 : 0} />
      {countryFlag ? (
        <Tooltip
          title={country ? <Typography>{country}</Typography> : null}
          arrow
          placement={!isHorizontal ? "top" : undefined}
        >
          <Flex>{getCountryFlag(country ?? "")}</Flex>
        </Tooltip>
      ) : null}
    </LocationWrapper>
  );
};

interface ILocationWrapper {
  orientation: Orientation;
}
const LocationWrapper = styled.div<ILocationWrapper>`
  display: flex;
  align-items: center;
  flex-direction: ${props =>
    props.orientation === Orientation.horizontal ? "row" : "column-reverse"};
`;

const IconWrapper = styled(LocationOnIcon).attrs({
  fontSize: "small",
})`
  && {
    fill: gray;
  }
`;

const Flex = styled.div`
  display: flex;
  cursor: pointer;
`;
