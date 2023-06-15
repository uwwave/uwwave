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
  ITagToJobs,
} from "src/lib/requests/ExtensionRequests";

interface IJobsTagsProvider {
  children: React.ReactNode;
}

export const JobTagsProvider = ({ children }: IJobsTagsProvider) => {
  const [allTags, setAllTags] = useState<AllTagsObject>({});
  const [jobToTags, setJobsToTags] = useState<IJobToTags>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editTag, setEditTagState] = useState<string | undefined>();
  const [selectedTag, setSelectedTagState] = useState<string | undefined>();

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
    const newJobToTags = {
      ...jobToTags,
      [jobID]: [...jobToTags[jobID]].filter(x => x !== label),
    };
    if (tagToJobs[label].length <= 1) {
      const tagToSelect =
        tagsInUse.length >= 2
          ? tagsInUse[0] === label
            ? tagsInUse[1]
            : tagsInUse[0]
          : undefined;
      setSelectedTag(tagToSelect);
    }
    setJobsToTags(newJobToTags);
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
    if (tagsInUse.includes(editTag)) {
      setSelectedTag(newTag.label);
    }
    setJobsToTags(newJobToTags);
    ExtensionRequests.patchTag(editTag, newTag);
    setEditTagState(undefined);
  };

  const onDeleteTag = (tag?: string, disableRequest?: boolean) => {
    const tagToDelete = tag ?? editTag;
    if (!tagToDelete) {
      return;
    }
    const newAllTags = { ...allTags };
    delete newAllTags[tagToDelete];
    setAllTags({
      ...newAllTags,
    });
    if (tagsInUse.includes(tagToDelete)) {
      setSelectedTag(tagsInUse.length ? tagsInUse[0] : undefined);
    }
    const newJobToTags = { ...jobToTags };
    Object.keys(jobToTags).forEach(jobID => {
      newJobToTags[jobID] = [
        ...newJobToTags[jobID].filter(x => x !== tagToDelete),
      ];
    });
    setJobsToTags(newJobToTags);
    if (!disableRequest) {
      ExtensionRequests.deleteTag(tagToDelete);
    }
    setEditTagState(undefined);
  };

  const tagToJobs: ITagToJobs = useMemo(() => {
    const out: ITagToJobs = {};
    Object.entries(jobToTags).forEach(([jobKey, tags]) => {
      tags.forEach(tag => {
        if (out[tag] === undefined) {
          out[tag] = [jobKey];
          return;
        }
        out[tag].push(jobKey);
      });
    });
    return out;
  }, [jobToTags]);

  const tagToJobsCount: ITagCount = useMemo(() => {
    const out: ITagCount = {};
    Object.keys(tagToJobs).forEach(tag => {
      out[tag] = tagToJobs[tag].length;
    });
    return out;
  }, [tagToJobs]);

  const tagsInUse: string[] = useMemo(() => {
    return Object.keys(tagToJobsCount);
  }, [tagToJobsCount]);

  const tagsNotInUse: string[] = useMemo(() => {
    const temp = { ...allTags };
    tagsInUse.forEach(tagInUse => {
      delete temp[tagInUse];
    });
    return Object.keys(temp);
  }, [tagsInUse]);

  const setSelectedTag = (tag: string | undefined) => {
    setSelectedTagState(tag);
  };

  const deleteAllUnusedTags = () => {
    ExtensionRequests.bulkDeleteTags(tagsNotInUse);
    const newAllTags = { ...allTags };
    tagsNotInUse.forEach(tag => {
      delete newAllTags[tag];
    });
    setAllTags({
      ...newAllTags,
    });
    const newJobToTags = { ...jobToTags };
    Object.keys(jobToTags).forEach(jobID => {
      newJobToTags[jobID] = [
        ...newJobToTags[jobID].filter(x => x in newAllTags),
      ];
    });
    setJobsToTags(newJobToTags);
    setEditTagState(undefined);
  };

  const totalTaggedJobs: number = useMemo(() => {
    return Object.values(jobToTags).filter(x => x.length).length;
  }, [jobToTags]);

  const value: JobTagsContextType = {
    totalTaggedJobs,
    selectedTag,
    setSelectedTag,
    tagsNotInUse,
    tagsInUse,
    tagToJobs,
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
    deleteAllUnusedTags,
  };

  return (
    <JobTagsContext.Provider value={value}>{children}</JobTagsContext.Provider>
  );
};
