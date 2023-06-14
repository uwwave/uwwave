export const ALL_TAGS_KEY = "all_tags";

export const TAG_DATA_IDENTIFIER = "jobTags_";

export function getJobTagStorageKey(jobID: string) {
  return TAG_DATA_IDENTIFIER + jobID;
}
