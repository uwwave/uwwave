import { CanadaIcon } from "src/components/icons/flags/Canada";
import { ChinaIcon } from "src/components/icons/flags/China";
import { JapanIcon } from "src/components/icons/flags/Japan";
import { USIcon } from "src/components/icons/flags/US";

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
    default:
      return null;
  }
};
