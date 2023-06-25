import styled from "styled-components";
import React, { useState } from "react";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useUserContext } from "src/lib/context/User/UserContext";
import { Spacer } from "src/components/Spacer/Spacer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { signOut } from "next-auth/react";
import { TertiaryButton } from "../Buttons/TertiaryButton";
import { useRouter } from "next/router";
import ButtonBase from "@mui/material/ButtonBase";
import { getProfileImage } from "src/lib/types/profiles";
import { useViewport } from "src/lib/hooks/useViewport";

export const LoginButton = () => {
  const { isLoading, isLoggedIn, user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { open } = useLoginModalContext();
  const router = useRouter();
  const loggedInMenuOpen = Boolean(anchorEl);
  const { isMobile } = useViewport();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) {
    return <Spacer width={48} height={48} />;
  }

  const renderMenu = () => (
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
        <ListItemText>{`Hey ${user?.username ?? "Timmy"}!`}</ListItemText>
      </WelcomeWrapper>
      <MenuItem
        onClick={() => {
          router.push("/user?tab=0");
        }}
      >
        <ListItemText>My Account</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/user?tab=1");
        }}
      >
        <ListItemText>My Reviews</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/user?tab=2");
        }}
      >
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
  );
  if (isLoggedIn) {
    return (
      <div>
        <StyledButtonBase
          aria-controls={loggedInMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={loggedInMenuOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <ProfileImage imageURL={getProfileImage(user?.profilePicture)} />
        </StyledButtonBase>
        {isMobile ? null : renderMenu()}
      </div>
    );
  }

  return <TertiaryButton text="Login" onClick={open} white bold />;
};

const WelcomeWrapper = styled.div`
  padding: 0 16px;
  && {
    color: grey;
  }
`;

interface IProfileImage {
  imageURL: string;
}
const ProfileImage = styled.div<IProfileImage>`
  border-radius: 100%;
  border: 2px solid white;
  width: 48px;
  height: 48px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${props => props.imageURL});
`;

const StyledButtonBase = styled(ButtonBase)`
  && {
    border-radius: 100%;
  }
`;
