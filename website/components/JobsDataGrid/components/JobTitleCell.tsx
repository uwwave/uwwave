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
      <StyledA href={`/jobs/${jobID}`} target="_blank">
        <CompanyProfilePic imageURL={imageURL} />
      </StyledA>
      <CompanyDetailsWrapper>
        <StyledA href={`/jobs/${jobID}`} target="_blank">
          <Typography>{jobName}</Typography>
        </StyledA>
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
  opacity: ${props => (props.imageURL ? 1 : 0.2)};
  background-image: url(${props => props.imageURL ?? "logo.png"});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const JobTitleCellWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

interface ICompanyProfilePic {
  imageURL?: string;
}

const CompanyDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledA = styled.a`
  color: ${Color.primaryButtonShadow};
`;