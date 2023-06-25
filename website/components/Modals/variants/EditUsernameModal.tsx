import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { Center } from "src/components/Center/Center";
import { BaseModal } from "src/components/Modals/BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import { RoundedTextField } from "src/components/TextField/RoundedTextField";
import { useUserContext } from "src/lib/context/User/UserContext";
import { Requests } from "src/lib/requests/Requests";
import styled from "styled-components";

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
}

export const EditUsernameModal = (props: IUploadDomainModal) => {
  const { onClose, isOpen } = props;
  const { user, refetchUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) {
      return;
    }
    setUsername(user.username);
  }, [user]);
  const handleRequest = async () => {
    setLoading(true);
    setError("");
    try {
      await Requests.patchUsername(username);
      await refetchUser();
      onClose();
    } catch (e: any) {
      setError(e.response.data);
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRequest();
  };
  const canUpdateUsername = user && user.username !== username && !loading;
  return (
    <BaseModal
      open={isOpen}
      hasCloseX
      onCloseModal={onClose}
      title={"Update Username"}
      dark
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit}>
        <StyledRoundedTextField
          autoFocus
          value={username}
          placeholder="Username"
          error={!!error}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <Spacer height={16} />
        <Center>
          <PrimaryButton disabled={!canUpdateUsername} type="submit">
            Submit
          </PrimaryButton>
        </Center>
        <Spacer height={16} />
        {error ? (
          <Typography color="red" align="center">
            {error}
          </Typography>
        ) : null}
      </form>
    </BaseModal>
  );
};

const StyledRoundedTextField = styled(RoundedTextField)`
  && div input {
    text-align: center;
  }
`;
