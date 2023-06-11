import { ITag } from "src/lib/requests/ExtensionRequests";
import { ExtensionRequests } from "src/lib/requests/ExtensionRequests";
import { useState } from "react";

export const useEditTagModal = (
  isOpen: boolean,
  initTag: ITag,
  allTags: ITag[],
  onPatchTag: (newTag: ITag) => void,
  onDeleteTag: () => void
) => {
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
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [tag, setTag] = useState<ITag>(initTag);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tagExistsError =
    tag.label !== initTag.label && allTags.some(x => x.label === tag.label);
  const tagIsSame = tag.label === initTag.label && tag.color === initTag.color;
  const disabled = tagExistsError || tagIsSame || !tag.label;
  const handlePatchTag = async () => {
    try {
      setIsLoading(true);
      await ExtensionRequests.patchTag(tag.label, tag.color);
      onPatchTag(tag);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  const handleDeleteTag = async () => {
    try {
      setIsLoading(true);
      await ExtensionRequests.deleteTag(initTag.label);
      onDeleteTag();
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return {
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
