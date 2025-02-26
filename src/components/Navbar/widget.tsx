import React from "react";
import { NavbarUI } from "./Navbar.ui";
import { useNavbar } from "./Navbar.script";
import { Squares2X2Icon, ChartBarIcon, BellIcon, TrophyIcon } from "@heroicons/react/24/outline";

export const NavbarWidget: React.FC = () => {
  const { logo, search, menuItems: baseMenuItems, auth } = useNavbar();

  const menuItems = [
    {
      ...baseMenuItems[0],
      icon: Squares2X2Icon,
    },
    {
      ...baseMenuItems[1],
      icon: ChartBarIcon,
    },
    {
      ...baseMenuItems[2],
      icon: TrophyIcon,
    },
    {
      ...baseMenuItems[3],
      icon: BellIcon,
    },
    {
      ...baseMenuItems[4],
      icon: TrophyIcon,
    },
  ];

  return <NavbarUI logo={logo} search={search} menuItems={menuItems} auth={auth} />;
};
