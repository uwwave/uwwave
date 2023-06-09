import styled from "styled-components";
import Tab from "@mui/material/Tab";
import MUITabs from "@mui/material/Tabs";

interface ITab {
  label: string;
}
interface ITabs {
  onSelectTab: (index: number) => void;
  currentTab: number;
  tabs: ITab[];
}
export const Tabs = (props: ITabs) => {
  const { onSelectTab, currentTab, tabs } = props;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onSelectTab(newValue);
  };

  return (
    <TabsWrapper>
      <MUITabs value={currentTab} onChange={handleChange} textColor="inherit">
        {tabs.map((x, i) => (
          <Tab key={i} label={x.label} value={i} />
        ))}
      </MUITabs>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  color: white;

  & .MuiTabs-indicator {
    background-color: white;
  }
`;
