import { useNavBar, UseNavBarProps } from "../../../hooks/useNavBar";

export type { UseNavBarProps };

export const useNavBarScript = (props: UseNavBarProps) => {
  return useNavBar(props);
}; 