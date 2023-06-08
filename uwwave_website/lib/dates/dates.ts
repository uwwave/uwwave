import moment from "moment";

export const calculateDaysFromNow = (date: Date): string => {
  const targetDate = moment(date);
  const currentDate = moment();

  const daysDifference = targetDate.diff(currentDate, "days");

  if (daysDifference === 0) {
    return "TODAY";
  } else if (daysDifference < 0) {
    return "OVERDUE";
  } else {
    return daysDifference.toString();
  }
};
