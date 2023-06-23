import styled from "styled-components";
import Tab from "@mui/material/Tab";
import MUITabs from "@mui/material/Tabs";
import { useState } from "react";

export interface ITab {
  label: string;
  color?: string;
  selectedIcon?: React.ReactElement;
  editIcon?: React.ReactElement;
  onEditClick?: () => void;
}
interface ITabs {
  onSelectTab: (index: number) => void;
  currentTab: number;
  tabs: ITab[];
}
export const Tabs = (props: ITabs) => {
  const { onSelectTab, currentTab, tabs } = props;
  const [hovering, setHovering] = useState(-1);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onSelectTab(newValue);
  };

  return (
    <TabsWrapper>
      <MUITabs value={currentTab} onChange={handleChange} textColor="inherit">
        {tabs.map((x, i) => {
          const selected = currentTab === i;
          return (
            <StyledTab
              key={i}
              label={x.label}
              value={i}
              textLabelColor={selected ? "white" : x?.color ?? "white"}
              bgColor={
                selected ? x?.color ?? "rgba(0,0,0,0)" : "rgba(0, 0, 0, 0)"
              }
              icon={
                selected
                  ? hovering === i
                    ? x.editIcon
                    : x.selectedIcon
                  : undefined
              }
              iconPosition="start"
              onMouseEnter={() => {
                setHovering(i);
              }}
              onMouseLeave={() => {
                setHovering(-1);
              }}
              onClick={() => {
                if (!selected || !x.onEditClick) {
                  return;
                }
                x.onEditClick();
              }}
            />
          );
        })}
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

interface IStyledTab {
  textLabelColor: string;
  bgColor: string;
}
const StyledTab = styled(Tab)<IStyledTab>`
  && {
    color: ${props => props.textLabelColor};
    background-color: ${props => props.bgColor};
    border-radius: 8px;
    padding-top: 8px;
    min-height: 56px;
    text-transform: none;
  }
`;
