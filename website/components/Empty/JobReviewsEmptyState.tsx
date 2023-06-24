import Typography from "@mui/material/Typography";
import { Center } from "src/components/Center/Center";
import { AddReviewButton } from "src/components/NavigationBar/AddReviewButton";
import { Spacer } from "src/components/Spacer/Spacer";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { Page } from "src/lib/types/page";
import { BackgroundColor } from "src/styles/color";
import styled from "styled-components";

interface IReviewsEmptyState {
  afterSubmit?: () => void;
  origin?: Page;
  title: string;
  company?: ICompanyClearbitData;
}
export const ReviewsEmptyState = ({
  afterSubmit,
  origin,
  title,
  company,
}: IReviewsEmptyState) => {
  return (
    <Main>
      <Spacer height={64} />
      <Center>
        <Typography color="white" align="center">
          {title}
        </Typography>
      </Center>
      <Spacer height={16} />
      <Center>
        <AddReviewButton
          afterSubmit={afterSubmit}
          origin={origin}
          company={company}
        />
      </Center>
      <Spacer height={64} />
    </Main>
  );
};

const Main = styled.div`
  background-color: ${BackgroundColor.dark};
  border-radius: 4px;
`;
