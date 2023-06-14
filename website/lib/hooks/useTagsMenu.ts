import { useState } from "react";
import { ITag } from "src/lib/requests/ExtensionRequests";
import { convertToCamelCase } from "../strings/convertStrings";
import uniqolor from "uniqolor";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";

export const useTagsMenu = (jobID: string) => {
  const [inputVal, setInputStateVal] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {
    isLoading,
    allTags,
    jobToTags,
    onSelectTag,
    onRemoveTag,
    onCreateNewTagAndAddToJob,
    setEditTag,
    onPatchTag,
    onDeleteTag,
    editTag,
  } = useJobTagsContext();
  const selectedTags = jobToTags[jobID] ?? [];
  const tagsToSelect = Object.keys(allTags).filter(
    otherTag => !selectedTags.some(selectedTag => selectedTag === otherTag)
  );

  const selectTag = (label: string) => {
    const tag = tagsToSelect.find(x => x === label);
    if (!tag) {
      return;
    }
    onSelectTag(jobID, tag);
  };

  const removeTag = (label: string) => {
    onRemoveTag(jobID, label);
  };

  const onSubmit = () => {
    if (!inputVal) {
      setError(`Type in a value`);
      return;
    }
    if (!canCreateNew) {
      setError(`Tag "${convertToCamelCase(inputVal)}" already exists`);
      return;
    }
    uniqolor(123, {});
    const newColor = uniqolor.random();
    const newTag: ITag = {
      color: newColor.color,
      label: convertToCamelCase(inputVal),
    };
    onCreateNewTagAndAddToJob(jobID, newTag);
    setInputStateVal("");
  };

  const setInputVal = (val: string) => {
    setError("");
    setInputStateVal(val);
  };

  const filteredTagsToSelect = tagsToSelect.filter(x => {
    return x.toLowerCase().includes(inputVal.toLowerCase());
  });

  const tagOptions = inputVal ? filteredTagsToSelect : tagsToSelect;
  const canCreateNew =
    inputVal &&
    !tagsToSelect.some(x => x === convertToCamelCase(inputVal)) &&
    !selectedTags.some(x => x === convertToCamelCase(inputVal));

  const isEditModalOpen = !!editTag;
  const displaySelectedTags: ITag[] = selectedTags.map(label => {
    return {
      ...allTags[label],
      label,
    };
  });
  const displayTagsToSelect: ITag[] = tagOptions.map(label => {
    return {
      ...allTags[label],
      label,
    };
  });

  return {
    displaySelectedTags,
    loading: isLoading,
    selectedTags,
    displayTagsToSelect,
    selectTag,
    removeTag,
    inputVal,
    setInputVal,
    canCreateNew,
    onSubmit,
    error,
    editTag,
    setEditTag,
    isEditModalOpen,
    onPatchTag,
    onDeleteTag,
  };
};
