import { BackgroundColor } from "src/styles/color";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import { TagJobIconButton } from "src/components/Buttons/TagJobIconButton";
import Tooltip from "@mui/material/Tooltip";

interface IActionsCell {
  jobID: string;
  pageSize: number;
}

export const ActionsCell = (props: IActionsCell) => {
  const { jobID, pageSize } = props;
  return (
    <ActionsWrapper>
      <TagJobIconButton jobID={jobID} pageSize={pageSize} />
      <Tooltip title="Open in Waterloo Works" arrow placement="top">
        <StyledA
          href={`https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm?ck_jobid=${jobID}`}
          target="_blank"
        >
          <IconButton>
            <OpenInNewIcon />
          </IconButton>
        </StyledA>
      </Tooltip>
    </ActionsWrapper>
  );
};

const StyledA = styled.a`
  && button svg {
    color: ${BackgroundColor.darker};
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
