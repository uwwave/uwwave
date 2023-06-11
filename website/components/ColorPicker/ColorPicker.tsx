import React, { useState } from "react";
import { TwitterPicker, ColorResult } from "react-color";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface OwnProps {
  value: string;
  callback(color: string): void;
  colors: string[];
  disabled?: boolean;
  outline?: boolean;
  maxwidth?: boolean;
}
const ColorPicker = (props: OwnProps) => {
  const { value, callback, colors, disabled, outline, maxwidth } = props;
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (color: ColorResult) => {
    callback(color.hex);
  };
  return (
    <>
      <ButtonBaseWrapper
        onClick={handleToggle}
        disabled={disabled ? 1 : 0}
        outline={outline}
        maxwidth={maxwidth}
      >
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        <ButtonWrapper color={value || "black"} maxwidth={maxwidth} />
      </ButtonBaseWrapper>
      <PickerContainer>
        {open && (
          <ClickAwayListener onClickAway={handleClose}>
            <PickerWrapper>
              <TwitterPicker
                onChange={handleChange}
                colors={colors}
                onChangeComplete={handleClose}
              />
            </PickerWrapper>
          </ClickAwayListener>
        )}
        <PickerWrapper hide>
          <TwitterPicker onChange={handleChange} colors={colors} />
        </PickerWrapper>
      </PickerContainer>
    </>
  );
};

export default ColorPicker;

interface ButtonBaseProps {
  disabled?: number;
  outline?: boolean;
  maxwidth?: boolean;
}
const ButtonBaseWrapper = styled.div<ButtonBaseProps>`
  width: ${props => (props.maxwidth ? "100%" : "64.2px")};
  border-radius: 4px;
  display: flex;
  cursor: pointer;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, ${props => (props.outline ? "0.3" : "0")});
  padding: 4px;
  box-sizing: border-box;
  pointer-events: ${props => (props.disabled ? "none" : "initial")};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  background-color: ${props => (props.outline ? "white" : "none")};

  &:hover {
    border: 1px solid #131313;
  }
`;

interface ButtonProps {
  color: string;
  maxwidth?: boolean;
}
const ButtonWrapper = styled.div<ButtonProps>`
  background-color: ${props => props.color};
  width: ${props => (props.maxwidth ? "100%" : "30px")};
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.54);
`;
interface PickerWrapperProps {
  hide?: boolean;
}
const PickerWrapper = styled.div<PickerWrapperProps>`
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 2;
  visibility: ${props => (props.hide ? "hidden" : "visible")};
`;

const PickerContainer = styled.div`
  position: relative;
`;
