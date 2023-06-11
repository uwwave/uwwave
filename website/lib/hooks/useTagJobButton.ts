import { useState } from 'react'
import { ITag } from 'src/lib/requests/ExtensionRequests';

export const useTagJobButton = (initSelectedTags: ITag[], tagsToSelect: ITag[]) => {
    const [hovering, setHovering] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState(initSelectedTags)
    const [userTagsToSelect, setUserTagsToSelect] = useState(tagsToSelect)
    const hasTagsSelected = selectedTags.length > 0
    const selected = hasTagsSelected
    const hasTagsButtonText = hasTagsSelected ? (selectedTags.length > 1 ? `${selectedTags[0].label} +${selectedTags.length - 1}` : selectedTags[0].label) : ""
    const buttonText = hasTagsSelected ? hasTagsButtonText : "Tag"
    const hoveringText = hasTagsSelected ? "Edit Tags" : "Add Tags"
    const iconColor = hasTagsSelected ? selectedTags[0].color : "white"

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
        setSelectedTags,
        userTagsToSelect,
        setUserTagsToSelect
    }
}