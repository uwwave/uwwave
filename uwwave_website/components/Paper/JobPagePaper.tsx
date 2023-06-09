import Box from "@mui/material/Box";
import { BackgroundColor } from "src/styles/color";

interface IJobPagePaper {
  children: React.ReactNode;
}

export const JobPagePaper = (props: IJobPagePaper) => {
  const { children } = props;
  return (
    <Box
      bgcolor={BackgroundColor.dark}
      sx={{ borderRadius: "16px", p: 4, mt: 2 }}
      color="white"
    >
      {children}
    </Box>
  );
};
