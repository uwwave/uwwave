import MUITypography from "@mui/material/Typography";
import styled from "styled-components";
import React, { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useUserContext } from "src/lib/context/User/UserContext";
import { Spacer } from "src/components/Spacer/Spacer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { signOut } from "next-auth/react";

export const LoginButton = () => {
  const { isLoading, isLoggedIn, user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { open } = useLoginModalContext();
  const loggedInMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) {
    return <Spacer width={48} height={48} />;
  }
  if (isLoggedIn) {
    return (
      <div>
        <IconButton
          aria-controls={loggedInMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={loggedInMenuOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <StyledAccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={loggedInMenuOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                "width": "240px",
                "overflow": "visible",
                "filter": "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "mt": 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <WelcomeWrapper>
            <ListItemText>{`Hey, ${
              user?.username ?? "FruitCake"
            }`}</ListItemText>
          </WelcomeWrapper>
          <MenuItem>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Spacer height={64} />
          <MenuItem
            onClick={() => {
              signOut();
            }}
          >
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <ButtonBase onClick={open}>
      <TextWrapper>
        <MUITypography>Login</MUITypography>
      </TextWrapper>
    </ButtonBase>
  );
};

const TextWrapper = styled.div`
  display: flex;
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  && {
    font-size: 32px;
    color: white;
  }
`;

const WelcomeWrapper = styled.div`
  padding: 0 16px;
  && {
    color: grey;
  }
`;
