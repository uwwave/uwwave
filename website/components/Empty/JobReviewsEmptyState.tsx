import Typography from "@mui/material/Typography";
import { Center } from "src/components/Center/Center";
import { AddReviewButton } from "src/components/NavigationBar/AddReviewButton";
import { Spacer } from "src/components/Spacer/Spacer";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { Page } from "src/lib/types/page";

interface IReviewsEmptyState {
  onClose?: () => void;
  origin?: Page;
  title: string;
  company?: ICompanyClearbitData;
}
export const ReviewsEmptyState = ({
  onClose,
  origin,
  title,
  company,
}: IReviewsEmptyState) => {
  return (
    <>
      <Spacer height={64} />
      <Center>
        <Typography color="white" align="center">
          {title}
        </Typography>
      </Center>
      <Spacer height={16} />
      <Center>
        <AddReviewButton onClose={onClose} origin={origin} company={company} />
      </Center>
      <Spacer height={64} />
    </>
  );
};
