import { IJobKeyword } from "../requests/Requests";

export const parseJobKeywords = (data: string): IJobKeyword[] => {
  const parsedData = JSON.parse(data) as IJobKeyword[];
  const hash: { [key: string]: boolean } = {};
  if (parsedData.length < 1) {
    throw "Empty";
  }
  for (const item of parsedData) {
    const keys = Object.keys(item);
    if (
      keys.length > 2 ||
      !keys.includes("jobID") ||
      !keys.includes("keywords")
    ) {
      throw "Atleast one item has bad keys";
    }
    if (typeof item.jobID !== "string") {
      throw "One of the JobIDS is not a string";
    }
    if (
      !Array.isArray(item.keywords) ||
      !item.keywords.every(item => typeof item === "string")
    ) {
      throw "Atleast One of the keywords is not formatted correctly";
    }
    if (item.jobID in hash) {
      throw "Duplicate job IDs";
    }
    if (item.keywords.length < 1) {
      throw "One job has no keywords";
    }
    hash[item.jobID] = true;
  }
  return parsedData;
};
