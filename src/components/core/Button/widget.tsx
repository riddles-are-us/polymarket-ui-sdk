import React from "react";
import { ButtonUI } from "./Button.ui";
import { useButtonScript, UseButtonProps } from "./Button.script";

export interface ButtonProps extends UseButtonProps {}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    icon,
    text,
    disabled,
    loading,
    isHovered,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    size
  } = useButtonScript(props);

  return (
    <ButtonUI
      icon={icon}
      text={text}
      disabled={disabled}
      loading={loading}
      isHovered={isHovered}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      size={size}
    />
  );
}; 