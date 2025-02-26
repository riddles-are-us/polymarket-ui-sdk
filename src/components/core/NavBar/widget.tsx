import React from "react";
import { NavBarUI } from "./NavBar.ui";
import { useNavBarScript, UseNavBarProps } from "./NavBar.script";

export interface NavBarProps extends UseNavBarProps {}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const {
    items,
    position,
    isSmallScreen,
    activeItem,
    handleItemClick
  } = useNavBarScript(props);

  return (
    <NavBarUI
      items={items}
      position={position}
      isSmallScreen={isSmallScreen}
      activeItem={activeItem}
      onItemClick={handleItemClick}
    />
  );
}; 