import Typography from "@mui/material/Typography";
import styled from "styled-components";

interface IDataGridHeader {
  title: string;
  color: string;
}
export const DataGridHeader = ({ title, color }: IDataGridHeader) => {
  return (
    <MainWrapper bgcolor={color}>
      <Typography color="white" variant="h6">
        {title}
      </Typography>
    </MainWrapper>
  );
};

interface IMain {
  bgcolor: string;
}
const MainWrapper = styled.div<IMain>`
  background-color: ${props => props.bgcolor};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
