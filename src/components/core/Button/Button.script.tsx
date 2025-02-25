import { useButton, UseButtonProps } from "../../../hooks/useButton";

export type { UseButtonProps };

export const useButtonScript = (props: UseButtonProps) => {
  return useButton(props);
}; 