import moment from "moment";
import { HeaderCard } from "../HeaderCard";
import Typography from "@mui/material/Typography";

interface IProfileHeaderCard {
  username: string;
  imageURL?: string;
  dateJoined?: number;
  isLoading: boolean;
}
export const ProfileHeaderCard = ({
  username,
  imageURL,
  isLoading,
  dateJoined,
}: IProfileHeaderCard) => {
  const renderDate = () => {
    if (!dateJoined) {
      return undefined;
    }
    const formattedDate = moment(dateJoined).format("MMMM D, YYYY");
    return (
      <Typography color="grey">{`Date Joined: ${formattedDate}`}</Typography>
    );
  };
  return (
    <HeaderCard
      imageURL={imageURL ?? "/logo-empty.png"}
      title={username}
      isLoading={isLoading}
      subTitle={renderDate()}
    />
  );
};
