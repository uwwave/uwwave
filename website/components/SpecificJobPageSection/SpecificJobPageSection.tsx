import Typography from "@mui/material/Typography";
import { Spacer } from "../Spacer/Spacer";
import styled from "styled-components";
import { Color } from "src/styles/color";
import { JobPagePaper } from "../Paper/JobPagePaper";

export const SpecificJobPageSection = (props: {
  jobSectionTitle: string;
  jobSectionDescription: React.ReactElement[];
}) => {
  const { jobSectionTitle, jobSectionDescription } = props;

  return (
    <JobPagePaper>
      <Typography variant="h5" fontWeight="bold" color="white">
        {jobSectionTitle}
      </Typography>
      <Spacer height={16} />
      <Text> {jobSectionDescription}</Text>
    </JobPagePaper>
  );
};

const Text = styled(Typography).attrs({
  color: "white",
  variant: "h6",
})`
  & a {
    color: ${Color.primaryButton};
  }
`;
