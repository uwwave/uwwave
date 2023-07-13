import Typography from "@mui/material/Typography";
import { BaseModal } from "../BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import { Requests } from "src/lib/requests/Requests";
import { useState } from "react";
import { RoundedTextField } from "src/components/TextField/RoundedTextField";

interface IUploadDomainModal {
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
  onClearbitCompanyData: (data: any) => void;
  url?: string;
}

export const UploadDomainModal = (props: IUploadDomainModal) => {
  const { companyName, onClose, isOpen, onClearbitCompanyData, url } = props;
  const [domain, setDomain] = useState(url ?? "");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setError(false);
    setLoading(true);
    Requests.addCompanyDomain(domain, companyName)
      .then(res => {
        onClearbitCompanyData(res);
        setLoading(false);
        onClose();
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const disableConfirm = !domain || domain === url;
  return (
    <BaseModal
      open={isOpen}
      onClickOk={handleSubmit}
      isLoading={loading}
      hasCloseX
      confirmText="Submit"
      onCloseModal={onClose}
      disableConfirm={disableConfirm}
      dark
    >
      <Typography align="center" variant="h5" color="white">
        <b>Submit Company Domain for:</b>
      </Typography>
      <Typography align="center" color="white">
        {companyName}
      </Typography>
      <Spacer height={32} />
      <Typography align="center" color="white">
        This helps us find valuable info that benefit you and fellow job
        seekers.
      </Typography>
      <Spacer height={32} />
      <Center>
        <TextFieldWrapper>
          <RoundedTextField
            disabled={loading}
            error={error}
            variant="outlined"
            placeholder={`www.${companyName?.split(" ").join("-")}.com`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDomain(e.target.value);
            }}
            value={domain}
            fullWidth
            autoFocus
          />
        </TextFieldWrapper>
      </Center>
      {error ? (
        <Typography align="center" color="red">
          Error: Make sure domain is correct
        </Typography>
      ) : null}
    </BaseModal>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const TextFieldWrapper = styled.div`
  width: 300px;
`;
