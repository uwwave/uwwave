import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import { BackgroundColor } from "src/styles/color";
import ListItemIcon from "@mui/material/ListItemIcon";
import { LoginButton } from "./LoginButton";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useUserContext } from "src/lib/context/User/UserContext";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { WaveLogo } from "src/components/icons/logo/Navbar";
import { Spacer } from "src/components/Spacer/Spacer";

interface ISideNav {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSideNav = (props: ISideNav) => {
  const { isOpen, onClose } = props;
  const { open: openLoginModal } = useLoginModalContext();
  const { user } = useUserContext();
  const router = useRouter();
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <MainWrapper>
        <List>
          <ListItemButton
            onClick={() => {
              router.push("/");
              onClose();
            }}
          >
            <WaveLogo color="white" />
            <Spacer width={16} />
            <ListItemText primary="Wave Home Page" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              router.push("/admin");
              onClose();
            }}
          >
            <ListItemText primary="Admin Home" />
          </ListItemButton>
          <ListItemButton
            onClick={
              user
                ? () => {
                    router.push("/user");
                    onClose();
                  }
                : () => {
                    openLoginModal();
                    onClose();
                  }
            }
          >
            <ListItemIcon>
              <LoginButton />
            </ListItemIcon>
            <ListItemText primary={user ? user.username : ""} />
          </ListItemButton>
          {user ? (
            <ListItemButton
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          ) : null}
        </List>
      </MainWrapper>
    </Drawer>
  );
};

const MainWrapper = styled.div`
  width: 250px;
  background-color: ${BackgroundColor.dark};
  height: 100%;
  && {
    color: white;
  }
`;
