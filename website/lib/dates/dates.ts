import moment from "moment";
import { JobsPageRowData } from "../jobsList/jobsList";

export const calculateDaysFromNow = (date: Date): string => {
  const targetDate = moment(date);
  const currentDate = moment();

  const daysDifference = targetDate.diff(currentDate, "days");

  if (daysDifference === 0) {
    return "TODAY";
  } else if (daysDifference < 0) {
    return "LATE";
  } else if (daysDifference === 1) {
    return "Tomorrow";
  } else {
    return `${daysDifference.toString()} days`;
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

export const getEarliestDeadline = (jobs: JobsPageRowData[]) => {
  if (jobs.length === 0) {
    return "";
  }
  let out = jobs[0].appDeadline;
  jobs.forEach(job => {
    const deadline = job.appDeadline;
    if (new Date(out).getTime() > new Date(deadline).getTime()) {
      out = deadline;
    }
  });
  return out;
};

export const generateSchoolTerms = (numTerms: number): string[] => {
  const terms: string[] = [];
  let termDate = moment();

  for (let i = 0; i < numTerms; i++) {
    const term = getTermName(termDate);
    terms.push(term);
    termDate = termDate.subtract(4, "months");
  }

  return terms;
};

const getTermName = (date: moment.Moment): string => {
  const year = date.format("YYYY");
  const month = date.format("MMMM");
  const term = getTerm(month);
  return `${term} ${year}`;
};

const getTerm = (month: string): string => {
  switch (month) {
    case "January":
    case "February":
    case "March":
    case "April":
      return "Winter";
    case "May":
    case "June":
    case "July":
    case "August":
      return "Spring";
    default:
      return "Fall";
  }
};
