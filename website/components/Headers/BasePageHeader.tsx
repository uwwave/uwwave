import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";

interface IBasePageHeader {
  infoTiles: React.ReactNode[];
  isLoading: boolean;
}

export const BasePageHeader = ({ infoTiles, isLoading }: IBasePageHeader) => {
  if (isLoading) {
    return (
      <>
        <MainWrapper isLoading>
          {infoTiles.map((_, i) => (
            <Skeleton key={i} variant="rounded" width={160} height={64} />
          ))}
        </MainWrapper>
      </>
    );
  }
  return (
    <>
      <MainWrapper isLoading={false}>
        {infoTiles.map((tile, i) => (
          <div key={i}>{tile}</div>
        ))}
      </MainWrapper>
    </>
  );
};

interface ILoading {
  isLoading: boolean;
}
const MainWrapper = styled.div<ILoading>`
  display: flex;
  gap: ${props => (props.isLoading ? 16 : 48)}px;
  justify-content: center;
`;
