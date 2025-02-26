import React from "react";
import { NavbarUI } from "./Navbar.ui";
import { useNavbar } from "./Navbar.script";

export const NavbarWidget: React.FC = () => {
  const navbarProps = useNavbar();
  return <NavbarUI {...navbarProps} />;
};
