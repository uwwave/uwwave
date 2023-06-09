import Typography from "@mui/material/Typography";
import { BaseModal } from "../BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Requests } from "src/lib/requests/Requests";
import { useState } from "react";

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
    Requests.addCompanyDomain(companyName, domain)
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
    >
      <Typography align="center" variant="h5">
        <b>Submit Company Domain:</b>
      </Typography>
      <Typography align="center">{companyName}</Typography>
      <Spacer height={32} />
      <Typography align="center">
        This helps us uncover valuable information that benefit you and fellow
        job seekers.
      </Typography>
      <Spacer height={32} />
      <Center>
        <TextFieldWrapper>
          <TextField
            disabled={loading}
            error={error}
            variant="outlined"
            placeholder={`www.${companyName.split(" ").join("-")}.com`}
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
