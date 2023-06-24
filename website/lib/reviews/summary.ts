export const starsDisplay = (val: number | null | undefined): string | null => {
  if (val === null || val === undefined) {
    return null;
  }
  return (val / 20).toFixed(1).toString();
};

export const salaryDisplay = (
  min: number | null | undefined,
  max: number | null | undefined
): string | null => {
  if (min === null || min === undefined || max === null || max === undefined) {
    return null;
  }
  if (min === max) {
    return min.toString();
  }
  return `${min} - ${max}`;
};

export const coopNumberDisplay = (num: number): string => {
  if (num >= 7) {
    return `${num}+`;
  }
  switch (num) {
    case 0:
      return "other";
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
      break;
    default:
      return `${num}th`;
  }
};

export const coopNumberSubtitleDisplay = (num: number): string => {
  if (num >= 7) {
    return ` - ${num}+ previous co-ops`;
  }
  switch (num) {
    case 0:
      return "";
    case 1:
      return " - 1st co-op";
    case 2:
      return " - 2nd co-op";
    case 3:
      return " - 3rd co-op";
      break;
    default:
      return ` - ${num}th co-op`;
  }
};
