import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

interface IBasePageHeader {
  title: string;
  infoTiles: React.ReactNode[];
  isLoading: boolean;
}

export const BasePageHeader = ({
  title,
  infoTiles,
  isLoading,
}: IBasePageHeader) => {
  if (isLoading) {
    return (
      <MainWrapper isLoading>
        <Title variant="h3">
          <b>{title}</b>
        </Title>
        {infoTiles.map((_, i) => (
          <Skeleton key={i} variant="rounded" width={160} height={64} />
        ))}
      </MainWrapper>
    );
  }
  return (
    <MainWrapper isLoading={false}>
      <Title variant="h3">
        <b>{title}</b>
      </Title>
      {infoTiles.map((tile, i) => (
        <div key={i}>{tile}</div>
      ))}
    </MainWrapper>
  );
};

const Title = styled(Typography)`
  && {
    flex: 1;
  }
`;
interface ILoading {
  isLoading: boolean;
}
const MainWrapper = styled.div<ILoading>`
  display: flex;
  gap: ${props => (props.isLoading ? 16 : 48)}px;
`;
