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

export const getTimeDiffString = (timeOld: string) => {
  const timeDiffSeconds = moment().utc().diff(timeOld, "second");
  let timeDiffString;
  if (timeDiffSeconds === 1) {
    // 1 s
    timeDiffString = "1 second ago ";
  } else if (timeDiffSeconds < 60) {
    // < 1 min in seconds
    timeDiffString = `${moment().utc().diff(timeOld, "second")} seconds ago `;
  } else if (timeDiffSeconds < 119) {
    // 1 min
    timeDiffString = "1 minute ago ";
  } else if (timeDiffSeconds < 3600) {
    // < 1 hr in minutes
    timeDiffString = `${moment().utc().diff(timeOld, "minute")} minutes ago `;
  } else if (timeDiffSeconds < 7199) {
    // 1 hr
    timeDiffString = "1 hour ago ";
  } else if (timeDiffSeconds < 86400) {
    // < 1 day in hours
    timeDiffString = `${moment().utc().diff(timeOld, "hour")} hours ago `;
  } else if (timeDiffSeconds < 172799) {
    // 1 day
    timeDiffString = "1 day ago ";
  } else {
    // >= 2 days
    timeDiffString = `${moment().utc().diff(timeOld, "day")} days ago `;
  }
  return timeDiffString;
};
