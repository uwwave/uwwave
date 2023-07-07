import React, { useState } from "react";
import { RouteGuard } from "src/components/RouteGuard/RouteGuard";
import Container from "@mui/material/Container";
import { AdminSideNav } from "../NavigationBar/AdminSideNav";
import ButtonBase from "@mui/material/ButtonBase";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

interface IAdminPageWrapper {
  children: React.ReactNode;
}

export const AdminPageWrapper = ({ children }: IAdminPageWrapper) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    <>
      <AdminSideNav
        isOpen={sideNavOpen}
        onClose={() => {
          setSideNavOpen(false);
        }}
      />
      <RouteGuard admin>
        <MenuIconWrapper>
          <ButtonBase
            onClick={() => {
              setSideNavOpen(true);
            }}
          >
            <MenuIcon />
          </ButtonBase>
        </MenuIconWrapper>

        <Container>{children}</Container>
      </RouteGuard>
    </>
  );
};

const MenuIconWrapper = styled.div`
  padding: 16px;
`;
