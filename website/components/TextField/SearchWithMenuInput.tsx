import { RoundedTextField } from "./RoundedTextField";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
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

export interface IMenuItem {
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
  onIn?: () => void;
  onOut?: () => void;
  error?: boolean;
  initialValue?: IMenuItem;
}
export const SearchWithMenuInput = ({
  menuItems,
  onChangeValue,
  onChangeSearchValue,
  isLoading,
  selectedIcon,
  placeholder,
  zIndex,
  onIn,
  onOut,
  error,
  initialValue,
}: ISearchWithMenu) => {
  const [selectedValue, setSelectedValue] = useState(initialValue?.value ?? "");
  const [searchValue, setSearchValue] = useState(initialValue?.value ?? "");
  const [isInteracting, setIsInteracting] = useState(true);
  const [init, setInit] = useState(initialValue ? true : false);
  useEffect(() => {
    onChangeValue(selectedValue);
  }, [selectedValue]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!menuItems.length) {
      return;
    }
    setSelectedValue(menuItems[0].value);
    setSearchValue(menuItems[0].value);
  };
  const renderMenuList = () => {
    if (isLoading) {
      return null;
    }
    if (menuItems.length === 0 || selectedValue || !isInteracting || !init) {
      return null;
    }

    return (
      <StyledMenuList show={true}>
        {menuItems.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSelectedValue(item.value);
              setSearchValue(item.value);
            }}
          >
            {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
            <ListItemText>{item.value}</ListItemText>
          </MenuItem>
        ))}
      </StyledMenuList>
    );
  };
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsInteracting(false);
        onOut?.();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <MainWrapper
      ref={containerRef}
      onClick={() => {
        setIsInteracting(true);
        onIn?.();
      }}
    >
      <form onSubmit={handleSubmit}>
        <StyledRoundedTextField
          error={error}
          autoComplete="off"
          onFocus={() => {
            if (searchValue || selectedValue || init) {
              return;
            }
            setInit(true);
            onChangeSearchValue("");
          }}
          InputProps={{
            startAdornment: isLoading ? (
              <>
                <LogoLoader width={32} />
                <Spacer width={8} />
              </>
            ) : (
              <InputAdornment position="start">
                {selectedValue ? (
                  menuItems.find(x => x.value === selectedValue)?.icon ??
                  initialValue?.icon ??
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
            setSelectedValue("");
            onChangeValue("");
            setSearchValue(e.target.value);
            onChangeSearchValue(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace" || e.key === "Delete") {
              setSelectedValue("");
            }
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
    box-shadow: 4px 4px 32px rgba(0, 0, 0, 0.3);
  }
`;

interface IMenuList {
  show: boolean;
}
const StyledMenuList = styled(MenuList)<IMenuList>`
  && {
    padding: 0;
    height: ${props => (props.show ? "auto" : 0)};
  }
`;

const StyledRoundedTextField = styled(RoundedTextField)`
  && div input {
    padding-left: 0;
  }

  &&,
  && div {
    height: 48px;
  }
`;
