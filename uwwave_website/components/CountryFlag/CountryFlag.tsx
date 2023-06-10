import { CanadaIcon } from "src/components/icons/flags/Canada";
import { ChinaIcon } from "src/components/icons/flags/China";
import { JapanIcon } from "src/components/icons/flags/Japan";
import { USIcon } from "src/components/icons/flags/US";
import { TaiwanIcon } from "src/components/icons/flags/Taiwan";
import { UKIcon } from "../icons/flags/UnitedKingdowm";
import { GermanyIcon } from "../icons/flags/Germany";
import { SingaporeIcon } from "../icons/flags/Singapore";
import { NorwayIcon } from "../icons/flags/Norway";

export const getCountryFlag = (country: string) => {
  switch (country) {
    case "Canada":
      return <CanadaIcon />;
    case "United States":
      return <USIcon />;
    case "China":
      return <ChinaIcon />;
    case "Japan":
      return <JapanIcon />;
    case "Taiwan":
      return <TaiwanIcon />;
    case "United Kingdom":
      return <UKIcon />;
    case "Germany":
      return <GermanyIcon />;
    case "Singapore":
      return <SingaporeIcon />;
    case "Norway":
      return <NorwayIcon />;
    default:
      return null;
  }
};
