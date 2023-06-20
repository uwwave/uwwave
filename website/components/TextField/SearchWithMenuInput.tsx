import { RoundedTextField } from "./RoundedTextField";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Spacer } from "src/components/Spacer/Spacer";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { LogoLoader } from "../Loader/LogoLoader";

interface IMenuItem {
  value: string;
  icon?: React.ReactNode;
}
interface ISearchWithMenu {
  menuItems: IMenuItem[];
  onChangeValue: (value: string) => void;
  onChangeSearchValue: (value: string) => void;
  isLoading: boolean;
  selectedIcon: React.ReactNode;
  placeholder?: string;
  zIndex?: number;
}
export const SearchWithMenuInput = ({
  menuItems,
  onChangeValue,
  onChangeSearchValue,
  isLoading,
  selectedIcon,
  placeholder,
  zIndex,
}: ISearchWithMenu) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    onChangeValue(selectedValue);
  }, [selectedValue]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!menuItems.length) {
      return;
    }
    setSelectedValue(menuItems[0].value);
  };
  const renderMenuList = () => {
    if (isLoading) {
      return (
        <Center>
          <LogoLoader width={64} />
        </Center>
      );
    }
    if (menuItems.length === 0 || selectedValue) {
      return null;
    }

    return (
      <StyledMenuList>
        {menuItems.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSelectedValue(item.value);
            }}
          >
            {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
            <ListItemText>{item.value}</ListItemText>
          </MenuItem>
        ))}
      </StyledMenuList>
    );
  };
  return (
    <MainWrapper>
      <form onSubmit={handleSubmit}>
        <StyledRoundedTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {selectedValue ? (
                  menuItems.find(x => x.value === selectedValue)?.icon ??
                  selectedIcon
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),

            endAdornment: selectedValue ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSelectedValue("");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          placeholder={placeholder}
          value={selectedValue ? selectedValue : searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (selectedValue) {
              return;
            }
            setSearchValue(e.target.value);
            onChangeSearchValue(e.target.value);
          }}
          onSubmit={() => {
            console.log("fire");
          }}
        />
      </form>
      <Spacer height={8} />
      <PaperWrapper elevation={0} zIndex={zIndex ?? 100}>
        {renderMenuList()}
      </PaperWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  position: relative;
`;

interface IPaperWrapper {
  zIndex: number;
}
const PaperWrapper = styled(Paper)<IPaperWrapper>`
  && {
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% - 4px));
    z-index: ${props => props.zIndex};
    width: 100%;
    overflow: hidden;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }
`;
const StyledMenuList = styled(MenuList)`
  && {
    padding: 0;
  }
`;

const StyledRoundedTextField = styled(RoundedTextField)`
  && div input {
    padding-left: 0;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
