import Chip from "@mui/material/Chip";
import { ITag, ITagCount } from "src/lib/requests/ExtensionRequests";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";

interface ITagChip {
  tag: ITag;
  onDelete: () => void;
}
export const TagChip = ({ tag, onDelete }: ITagChip) => {
  const { setEditTag, tagToJobsCount } = useJobTagsContext();
  return (
    <StyledChip
      key={tag.label}
      bgcolor={tag.color}
      label={renderInnerChipContent({
        tag: tag,
        onSetEditTag: setEditTag,
        tagToJobsCount,
      })}
      deleteIcon={<ClearIcon />}
      onDelete={() => {
        onDelete();
      }}
    />
  );
};

interface IInnerChipContent {
  tag: ITag;
  onSetEditTag: (label: string) => void;
  tagToJobsCount: ITagCount;
}
const renderInnerChipContent = (props: IInnerChipContent) => {
  const { tag, onSetEditTag, tagToJobsCount } = props;
  const count = tagToJobsCount[tag.label];
  return (
    <>
      <InnerChipContentWrapper>
        <IconButton
          onClick={() => {
            onSetEditTag(tag.label);
          }}
        >
          <EditIcon />
        </IconButton>
        <Typography color="white">{`${tag.label}${
          count ? ` (${count})` : ""
        }`}</Typography>
      </InnerChipContentWrapper>
    </>
  );
};

interface IChip {
  bgcolor: string;
}

const StyledChip = styled(Chip)<IChip>`
  && {
    background-color: ${props => props.bgcolor};
    color: white;
  }

  && svg {
    fill: white;
  }

  & div {
    transform: translateY(-21px);
  }

  &:hover div {
    transform: translateY(12px);
  }
  cursor: pointer;
  overflow: hidden;
  transition: 1s transform ease;
`;

const InnerChipContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
