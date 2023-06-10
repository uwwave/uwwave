import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Footer } from "src/components/Footer/Footer";
import { JobsDataGrid } from "src/components/JobsDataGrid/JobsDataGrid";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import { BackgroundColor } from "src/styles/color";
import { useBookmarkedPage } from "src/lib/hooks/useBookmarkedPage";

const Bookmarked = () => {
  const { loading, jobs, onToggleBookmark } = useBookmarkedPage();
  return (
    <>
      <NavigationBar />
      <Container>
        <Spacer height={32} />
        <Typography align="center" variant={"h5"}>
          <b>Bookmarked List</b>
        </Typography>
        <Spacer height={32} />
      </Container>
      <WaterWrapper>
        <Spacer height={32} />
        <Container>
          <JobsDataGrid
            jobs={jobs}
            loading={loading}
            jobKeywords={{}}
            onToggleBookmark={onToggleBookmark}
          />
        </Container>
        <Spacer height={64} />
      </WaterWrapper>
      <Footer dark />
    </>
  );
};

export default Bookmarked;

const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${BackgroundColor.dark};
  min-height: 100vh;
`;
