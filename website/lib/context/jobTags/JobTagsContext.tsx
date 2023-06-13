import { createContext } from "react";
import {
  AllTagsObject,
  IJobToTags,
  ITag,
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
  onDeleteTag: () => void;
  closeEditModal: () => void;
}

export const JobTagsContext = createContext<JobTagsContextType | undefined>(
  undefined
);
