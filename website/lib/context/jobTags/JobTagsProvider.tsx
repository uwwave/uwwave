import React, { useState, useEffect, useMemo } from "react";
import {
  JobTagsContextType,
  JobTagsContext,
} from "src/lib/context/jobTags/JobTagsContext";
import {
  AllTagsObject,
  ExtensionRequests,
  IJobToTags,
  ITag,
  ITagCount,
} from "src/lib/requests/ExtensionRequests";

interface IJobsTagsProvider {
  children: React.ReactNode;
}

export const JobTagsProvider = ({ children }: IJobsTagsProvider) => {
  const [allTags, setAllTags] = useState<AllTagsObject>({});
  const [jobToTags, setJobsToTags] = useState<IJobToTags>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editTag, setEditTagState] = useState<string | undefined>();

  useEffect(() => {
    const fire = async () => {
      const [allTags, jobsToTags] = await Promise.all([
        ExtensionRequests.getAllTags(),
        ExtensionRequests.getAllJobsToTags(),
      ]);
      setAllTags(allTags);
      setJobsToTags(jobsToTags);
      setIsLoading(false);
    };

    fire();
  }, []);

  const onSelectTag = (jobID: string, tag: string) => {
    setJobsToTags({
      ...jobToTags,
      [jobID]: [...(jobToTags[jobID] ?? []), tag],
    });
    ExtensionRequests.onSelectTag(jobID, tag);
  };

  const onRemoveTag = (jobID: string, label: string) => {
    setJobsToTags({
      ...jobToTags,
      [jobID]: [...jobToTags[jobID]].filter(x => x !== label),
    });
    ExtensionRequests.onRemoveTag(jobID, label);
  };

  const onCreateNewTagAndAddToJob = (jobID: string, tag: ITag) => {
    setAllTags({
      ...allTags,
      [tag.label]: {
        color: tag.color,
      },
    });
    setJobsToTags({
      ...jobToTags,
      [jobID]: [...(jobToTags[jobID] ?? []), tag.label],
    });
    ExtensionRequests.createNewTagAndAddToJob(jobID, tag);
  };

  const setEditTag = (label: string) => {
    setEditTagState(label);
  };

  const closeEditModal = () => {
    setEditTagState(undefined);
  };

  const onPatchTag = (newTag: ITag) => {
    if (!editTag) {
      return;
    }
    const newAllTags = { ...allTags };
    delete newAllTags[editTag];
    setAllTags({
      ...newAllTags,
      [newTag.label]: {
        color: newTag.color,
      },
    });
    const newJobToTags = { ...jobToTags };
    Object.keys(jobToTags).forEach(jobID => {
      newJobToTags[jobID] = [
        ...newJobToTags[jobID].map(label => {
          if (label === editTag) {
            return newTag.label;
          }
          return label;
        }),
      ];
    });
    setJobsToTags(newJobToTags);
    ExtensionRequests.patchTag(editTag, newTag);
    setEditTagState(undefined);
  };

  const onDeleteTag = () => {
    if (!editTag) {
      return;
    }
    const newAllTags = { ...allTags };
    delete newAllTags[editTag];
    setAllTags({
      ...newAllTags,
    });
    const newJobToTags = { ...jobToTags };
    Object.keys(jobToTags).forEach(jobID => {
      newJobToTags[jobID] = [...newJobToTags[jobID].filter(x => x !== editTag)];
    });
    setJobsToTags(newJobToTags);
    ExtensionRequests.deleteTag(editTag);
    setEditTagState(undefined);
  };

  const tagToJobsCount: ITagCount = useMemo(() => {
    const out: ITagCount = {};
    Object.values(jobToTags).forEach(tags => {
      tags.forEach(tag => {
        if (out[tag] === undefined) {
          out[tag] = 1;
          return;
        }
        out[tag]++;
      });
    });
    return out;
  }, [jobToTags]);

  const value: JobTagsContextType = {
    tagToJobsCount,
    closeEditModal,
    onDeleteTag,
    allTags,
    jobToTags,
    isLoading,
    editTag,
    setEditTag,
    onSelectTag,
    onRemoveTag,
    onCreateNewTagAndAddToJob,
    onPatchTag,
  };

  return (
    <JobTagsContext.Provider value={value}>{children}</JobTagsContext.Provider>
  );
};
