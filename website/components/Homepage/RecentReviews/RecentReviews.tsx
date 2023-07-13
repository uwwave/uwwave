import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { RecentReviewsDataGrid } from "src/components/DataGrid/variants/RecentReviewsDataGrid";
import { BackgroundColor } from "src/styles/color";
import styled from "styled-components";
import { Spacer } from "src/components/Spacer/Spacer";
import { Tabs } from "src/components/Tabs/Tabs";
import { useState } from "react";
import { ReventInterviewsDataGrid } from "src/components/DataGrid/variants/RecentInterviewsDataGrid";

export const RecentReviews = () => {
  const [tab, setTab] = useState(0);

  const jobReviews = <RecentReviewsDataGrid />;
  return (
    <Main>
      <Container>
        <Typography align="center" variant="h4" color="white">
          <b>Recent Reviews</b>
        </Typography>
        <Tabs
          tabs={[
            {
              label: "Job Ratings",
            },
            {
              label: "Interviews",
            },
          ]}
          currentTab={tab}
          onSelectTab={(i: number) => {
            setTab(i);
          }}
        />
        <Spacer height={8} />
        <Relative>
          {/* placeholder for height */}
          <Show show={false}>
            <Paper variant="outlined">{jobReviews}</Paper>
          </Show>

          <Show show={tab === 0}>
            <Absolute>
              <Paper variant="outlined">{jobReviews}</Paper>
            </Absolute>
          </Show>
          <Show show={tab === 1}>
            <Absolute>
              <Paper variant="outlined">
                <ReventInterviewsDataGrid />
              </Paper>
            </Absolute>
          </Show>
        </Relative>
      </Container>
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  background-color: ${BackgroundColor.darker};
  padding-top: 32px;
  padding-bottom: 128px;
  position: relative;
  z-index: 200;
`;

interface IShow {
  show: boolean;
}

const Relative = styled.div`
  position: relative;
`;
const Show = styled.div<IShow>`
  visibility: ${props => (props.show ? "visible" : "hidden")};
`;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;
