import { Color } from "src/styles/color";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

interface IJobTitleCell {
  company: string;
  jobName: string;
  jobID: string;
  imageURL?: string;
}

export const JobTitleCell = (props: IJobTitleCell) => {
  const { company, jobName, jobID, imageURL } = props;
  return (
    <JobTitleCellWrapper>
      <StyledLink href={`/jobs/${jobID}`} target="_blank">
        <CompanyProfilePic imageURL={imageURL} />
      </StyledLink>
      <CompanyDetailsWrapper>
        <StyledLink href={`/jobs/${jobID}`} target="_blank">
          <Typography>{jobName}</Typography>
        </StyledLink>
        <Typography variant="caption">{company}</Typography>
      </CompanyDetailsWrapper>
    </JobTitleCellWrapper>
  );
};

const CompanyProfilePic = styled.div<ICompanyProfilePic>`
  min-width: 64px;
  height: 64px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #bbb;
  background-image: url(${props => props.imageURL ?? "/logo-empty.png"});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const JobTitleCellWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface ICompanyProfilePic {
  imageURL?: string;
}

const CompanyDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledLink = styled.a`
  color: ${Color.primaryButtonShadow};
`;
