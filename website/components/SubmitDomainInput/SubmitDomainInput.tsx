import { RoundedTextField } from "../TextField/RoundedTextField";
import { Spacer } from "../Spacer/Spacer";
import Typography from "@mui/material/Typography";
import { useSubmitDomainInput } from "src/lib/hooks/useSubmitDomainInput";
import React from "react";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { Center } from "../Center/Center";
import { PrimaryButton } from "../Buttons/PrimaryButton";

interface ISubmitDomainInput {
  onSuccess: (company: ICompanyClearbitData) => void;
}
export const SubmitDomainInput = ({ onSuccess }: ISubmitDomainInput) => {
  const { error, isLoading, val, setVal, onSubmit } =
    useSubmitDomainInput(onSuccess);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit}>
      <RoundedTextField
        required
        autoFocus
        disabled={isLoading}
        value={val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setVal(e.target.value);
        }}
        placeholder="https://example.com"
        size="small"
        error={!!error}
      />

      <Spacer height={8} />
      {error ? (
        <>
          <Typography color="red" align="center">
            {error}
          </Typography>
          <Spacer height={8} />
        </>
      ) : null}
      <Spacer height={32} />
      <Center>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Center>
    </form>
  );
};
