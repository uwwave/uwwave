import React from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { JobPagePaper } from "src/components/Paper/JobPagePaper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

interface IConfigTab {
  companyURL?: string;
  onClick: () => void;
}

export const ConfigTab = ({ companyURL, onClick }: IConfigTab) => {
  return (
    <JobPagePaper>
      <Typography variant="h5" color="white">
        Settings
      </Typography>
      <Spacer height={32} />
      <DomainSettingsWrapper>
        <Typography color="white">
          <b>Domain:</b>
        </Typography>
        <Spacer width={8} />
        <Typography color="white">{companyURL}</Typography>
        <IconButton color="inherit" onClick={onClick}>
          <EditIcon color="inherit" />
        </IconButton>
      </DomainSettingsWrapper>
    </JobPagePaper>
  );
};

const DomainSettingsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
