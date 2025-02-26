import { useState, useCallback } from "react";

export interface UseButtonProps {
  icon?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const useButton = ({
  icon,
  text,
  disabled = false,
  loading = false,
  size = 'medium',
  onClick
}: UseButtonProps = {}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = useCallback(() => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  }, [disabled, loading, onClick]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    icon,
    text,
    disabled,
    loading,
    size,
    isHovered,
    handleClick,
    handleMouseEnter,
    handleMouseLeave
  };
}; 