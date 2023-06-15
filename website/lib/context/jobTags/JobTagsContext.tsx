import { createContext, useContext } from "react";
import {
  AllTagsObject,
  IJobToTags,
  ITag,
  ITagCount,
  ITagToJobs,
} from "src/lib/requests/ExtensionRequests";

export interface JobTagsContextType {
  allTags: AllTagsObject;
  jobToTags: IJobToTags;
  isLoading: boolean;
  editTag?: string;
  setEditTag: (label: string) => void;
  onSelectTag: (jobID: string, label: string) => void;
  onRemoveTag: (jobID: string, label: string) => void;
  onCreateNewTagAndAddToJob: (jobID: string, tag: ITag) => void;
  onPatchTag: (newTag: ITag) => void;
  onDeleteTag: (tag?: string, disableRequest?: boolean) => void;
  closeEditModal: () => void;
  tagToJobsCount: ITagCount;
  tagToJobs: ITagToJobs;
  tagsInUse: string[];
  tagsNotInUse: string[];
  selectedTag?: string;
  setSelectedTag: (tag: string) => void;
  deleteAllUnusedTags: () => void;
  totalTaggedJobs: number;
}

export const JobTagsContext = createContext<JobTagsContextType | undefined>(
  undefined
);

export const useJobTagsContext = () => {
  const jobTagsContext = useContext(JobTagsContext);
  if (!jobTagsContext) {
    throw new Error("JobTagsProvider not wrapped");
  }
  return jobTagsContext;
};
