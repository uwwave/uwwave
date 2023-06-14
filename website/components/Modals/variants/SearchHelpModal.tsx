import Typography from "@mui/material/Typography";
import { BaseModal } from "../BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import SearchHelpGif from "src/public/search-help.gif";
import Image from "next/image";

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
        <b>How to</b>
      </Typography>
      <Spacer height={32} />
      <Center>
        <HelpGif src="search-help.gif" />
      </Center>
      <Spacer height={32} />
      <Typography>
        You can choose from various categories to refine your search. Select the
        dropdown menu to add/remove search terms. Select/deselect a pill to
        refine your search even further!
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
