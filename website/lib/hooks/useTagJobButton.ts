import { useState } from "react";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";

export const useTagJobButton = (jobID: string) => {
  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { jobToTags, allTags } = useJobTagsContext();
  const selectedTags = jobToTags[jobID] ?? [];
  const hasTagsSelected = selectedTags.length > 0;
  const selected = hasTagsSelected;
  const firstTagLabel = selectedTags[0];
  const hasTagsButtonText = hasTagsSelected
    ? selectedTags.length > 1
      ? `${firstTagLabel} +${selectedTags.length - 1}`
      : firstTagLabel
    : "";
  const buttonText = hasTagsSelected ? hasTagsButtonText : "Tag";
  const hoveringText = hasTagsSelected ? "Edit Tags" : "Add Tags";
  const iconColor = hasTagsSelected ? allTags[firstTagLabel]?.color : "white";

  return {
    hovering,
    setHovering,
    menuOpen,
    setMenuOpen,
    selected,
    buttonText,
    hoveringText,
    iconColor,
    selectedTags,
  };
};
