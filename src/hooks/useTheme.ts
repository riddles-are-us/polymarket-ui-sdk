import { useState, useCallback } from "react";
import type { Theme } from "../types";

const defaultTheme: Theme = {
  primary: "#3B82F6", // blue-500
  secondary: "#E5E7EB", // gray-200
};

export const useTheme = (initialTheme: Partial<Theme> = {}) => {
  const [theme, setTheme] = useState<Theme>({
    ...defaultTheme,
    ...initialTheme,
  });

  const updateTheme = useCallback((newTheme: Partial<Theme>) => {
    setTheme((prev) => ({
      ...prev,
      ...newTheme,
    }));
  }, []);

  return {
    theme,
    updateTheme,
  };
};
