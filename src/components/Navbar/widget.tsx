import React from "react";
import { NavbarUI } from "./Navbar.ui";
import { useNavbar } from "./Navbar.script";
import { Squares2X2Icon, ChartBarIcon, BellIcon, TrophyIcon, StarIcon } from "@heroicons/react/24/outline";
import { useThemeContext } from "../../contexts/ThemeContext";

export const NavbarWidget: React.FC = () => {
  const { logo, search, menuItems: baseMenuItems, auth } = useNavbar();
  const { isDarkMode, toggleDarkMode } = useThemeContext();

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
      icon: StarIcon,
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

  return (
    <NavbarUI
      logo={logo}
      search={search}
      menuItems={menuItems}
      auth={auth}
      darkMode={{
        enabled: isDarkMode,
        onToggle: toggleDarkMode,
      }}
    />
  );
};
