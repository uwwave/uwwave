import Typography from "@mui/material/Typography";
import { BaseModal } from "../BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchHelpModal = (props: IUploadDomainModal) => {
  const { onClose, isOpen } = props;

  return (
    <BaseModal
      open={isOpen}
      onClickOk={onClose}
      isLoading={false}
      hasCloseX
      confirmText="Roger that!"
      onCloseModal={onClose}
      disableConfirm={false}
    >
      <Typography align="center" variant="h5">
        <b>How to use search</b>
      </Typography>
      <Spacer height={32} />
      <Center>
        <HelpGif src="search-help.gif" />
      </Center>
      <Spacer height={32} />
      <Typography variant="h6">
        1. Select the dropdown menu to add/remove search terms based on
        different categories.
      </Typography>
      <Typography variant="h6">
        2. Click on a pill to active/deactive it
      </Typography>
      <Typography variant="h6">
        3. Click on header columns to order based on category values
      </Typography>
    </BaseModal>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const HelpGif = styled.img`
  width: 100%;
  height: auto;
`;
