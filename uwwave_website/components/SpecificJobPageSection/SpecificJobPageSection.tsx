import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { BackgroundColor } from "src/styles/color";
import { Spacer } from "../Spacer/Spacer";
import styled from "styled-components";
import { Color } from "src/styles/color";

export const SpecificJobPageSection = (props: {
  jobSectionTitle: string;
  jobSectionDescription: React.ReactElement[];
}) => {
  const { jobSectionTitle, jobSectionDescription } = props;

  return (
    <Box
      bgcolor={BackgroundColor.dark}
      sx={{ borderRadius: "16px", p: 4, mt: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" color="white">
        {jobSectionTitle}
      </Typography>
      <Spacer height={16} />
      <Text> {jobSectionDescription}</Text>
    </Box>
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
