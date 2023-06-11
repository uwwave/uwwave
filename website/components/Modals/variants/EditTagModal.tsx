import Typography from "@mui/material/Typography";
import { BaseModal } from "../BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import { ITag } from "src/lib/requests/ExtensionRequests";
import Chip from "@mui/material/Chip";
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
  tag: ITag;
}

export const EditTagModal = (props: IUploadDomainModal) => {
  const { isOpen, onClose, tag } = props;

  return (
    <BaseModal
      open={isOpen}
      confirmText="Submit"
      onCloseModal={onClose}
    >
      <Typography align="center" variant="h5">
        <b>Edit Tag</b>
      </Typography>
      
      {tag ? <><Spacer height={16} /><Center><StyledChip icon={<StyledBookmarkIcon/>} bgcolor={tag.color} label={<Typography>{tag.label}</Typography>}/> </Center></>: null}
    </BaseModal>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

interface IChip{
    bgcolor: string
}
const StyledChip = styled(Chip)<IChip>`
    && {
      background-color: ${props=>props.bgcolor};
      color: white;
    }
`

const StyledBookmarkIcon = styled(BookmarkIcon)`
    fill: white;
`