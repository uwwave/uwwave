import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export const SpecificJobPageSection = (props: {
  jobSectionTitle: string;
  jobSectionDescription: React.ReactElement[];
}) => {
  const { jobSectionTitle, jobSectionDescription } = props;

  return (
    <Box bgcolor="white" sx={{ borderRadius: "16px", p: 2, m: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        {jobSectionTitle}
      </Typography>
      <Typography> {jobSectionDescription}</Typography>
    </Box>
  );
};
