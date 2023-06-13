import { useContext, useEffect } from "react";
import { ITag } from "src/lib/requests/ExtensionRequests";
import { useState } from "react";
import { JobTagsContext } from "src/lib/context/jobTags/JobTagsContext";

export const useEditTagModal = () => {
  const [colors] = useState<string[]>([
    "#c0392b",
    "#d35400",
    "#EAB543",
    "#16a085",
    "#27ae60",
    "#3498db",
    "#9b59b6",
    "#1e3799",
    "#3B3B98",
    "#f368e0",
  ]);
  const jobTagsContext = useContext(JobTagsContext);
  if (!jobTagsContext) {
    throw new Error("JobTagsProvider not wrapped");
  }
  const { editTag, allTags, onDeleteTag, onPatchTag, closeEditModal } =
    jobTagsContext;
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [tag, setTag] = useState<ITag | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tagExistsError =
    tag && editTag && tag.label !== editTag && !!allTags[tag.label]?.color;
  const tagIsSame =
    tag && tag.label === editTag && tag.color === allTags[editTag]?.color;
  const disabled = tagExistsError || tagIsSame || !tag?.label;
  const handlePatchTag = async () => {
    try {
      setIsLoading(true);
      tag && onPatchTag(tag);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  const handleDeleteTag = async () => {
    try {
      setIsLoading(true);
      onDeleteTag();
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!editTag) {
      return;
    }
    console.log("fire");
    setTag({ label: editTag, color: allTags[editTag].color });
  }, [editTag]);

  const isOpen = !!editTag;

  return {
    initTag: editTag,
    onClose: closeEditModal,
    deleteMode,
    setDeleteMode,
    setTag,
    isLoading,
    disabled,
    handlePatchTag,
    handleDeleteTag,
    colors,
    tag,
    isOpen,
    tagExistsError,
  };
};
