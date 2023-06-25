import Typography from "@mui/material/Typography";
import { useUserContext } from "src/lib/context/User/UserContext";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import ButtonBase from "@mui/material/ButtonBase";
import { Spacer } from "../Spacer/Spacer";
import { useState } from "react";
import { EditUsernameModal } from "../Modals/variants/EditUsernameModal";

export const EditUsernameButton = () => {
  const { user } = useUserContext();
  if (!user) {
    return null;
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <EditUsernameModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <Main
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Typography color="white" variant={"h5"}>
          {user.username}
        </Typography>
        <Spacer width={8} />
        <StyledEditIcon />
      </Main>
    </>
  );
};

const Main = styled(ButtonBase)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 8px;
`;

const StyledEditIcon = styled(EditIcon)`
  && {
    color: white;
  }
`;
