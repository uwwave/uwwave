import { useState, useEffect } from 'react'
import { ExtensionRequests, ITag } from 'src/lib/requests/ExtensionRequests';
import { convertToCamelCase } from '../strings/convertStrings';
import uniqolor from 'uniqolor';

export const useTagsMenu = (jobID: number, onSetSelectedTags:(tags:ITag[]) => void,  onTagsToSelect:(tags:ITag[]) => void, userSelectedTabs?: ITag[], userTags?: ITag[]) => {
    const [selectedTags, setSelectedTags] = useState<ITag[]>(userSelectedTabs ?? [])
    const [tagsToSelect, setTagsToSelect] = useState<ITag[]>(userTags ?? [])
    const [inputVal, setInputStateVal] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(userSelectedTabs !== undefined && userTags !== undefined ? false : true)
    const [error, setError] = useState<string>("")
    const [editTag, setEditTagState] = useState<ITag | undefined>()

    useEffect(()=>{
        onSetSelectedTags(selectedTags)
    }, [selectedTags])
    useEffect(()=>{
        onTagsToSelect(tagsToSelect)
    }, [tagsToSelect])
    useEffect(() => {
        const fire = async() => {
            if(userSelectedTabs !== undefined && userTags !== undefined){
                return
            }
            const tagsSelected = userSelectedTabs ?? await ExtensionRequests.getSelecedTags(jobID);
            const allTags = userTags ?? await ExtensionRequests.getAllTags()
            const filteredTags = allTags.filter(
                (otherTag) =>
                  !tagsSelected.some(
                    (selectedTag) => selectedTag.label === otherTag.label
                  )
              );
              setTagsToSelect(filteredTags);
              setSelectedTags(tagsSelected);
              setLoading(false);
        }
        fire();
      }, []);

    const selectTag = (label: string) => {
        const tagIndex = tagsToSelect.findIndex(x=>x.label === label)
        if(tagIndex < 0){
            return;
        }
        const color = tagsToSelect[tagIndex].color
        const oldLabel = tagsToSelect[tagIndex].label
        setSelectedTags([...selectedTags, {color, label: oldLabel}])
        const newTagsToSelect = [...tagsToSelect]
        newTagsToSelect.splice(tagIndex, 1)
        setTagsToSelect(newTagsToSelect)
    }

    const removeTag = (label: string) => {
        const tagIndex = selectedTags.findIndex(x=>x.label === label)
        if(tagIndex < 0){
            return;
        }
        const color = selectedTags[tagIndex].color
        const oldLabel = selectedTags[tagIndex].label
        setTagsToSelect([...tagsToSelect, {color, label: oldLabel}])
        const newSelectedTags = [...selectedTags]
        newSelectedTags.splice(tagIndex, 1)
        setSelectedTags(newSelectedTags)
    }

    const onSubmit = () => {
        if(!canCreateNew){
            setError(`Tag "${convertToCamelCase(inputVal)}" already exists`)
            return;
        }
        uniqolor(123, {
        })
        const newColor = uniqolor.random()
        const newTag: ITag = {color:newColor.color, label:  convertToCamelCase(inputVal)}
        ExtensionRequests.createNewTagAndAddToJob(jobID, newTag)
        setSelectedTags([...selectedTags, newTag])
        setInputStateVal("")
    }

    const setInputVal = (val: string) => {
        setError("")
        setInputStateVal(val)
    }

    const filteredTagsToSelect = tagsToSelect.filter(x=>{
        return x.label.toLowerCase().includes(inputVal.toLowerCase())
    })

    const tagOptions = inputVal ? filteredTagsToSelect : tagsToSelect
    const canCreateNew = inputVal && !tagsToSelect.some(x=>x.label === convertToCamelCase(inputVal)) && !selectedTags.some(x=>x.label === convertToCamelCase(inputVal))

    const setEditTag = (tag?: ITag) => {
        setEditTagState(tag)
    }

    const isEditModalOpen = !!editTag

    return {loading, selectedTags, tagsToSelect: tagOptions, selectTag, removeTag, inputVal, setInputVal,
        canCreateNew,
        onSubmit,
        error,
        editTag,
        setEditTag,
        isEditModalOpen,
    }
}