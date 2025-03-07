import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

interface AppProps {
  children?: React.ReactNode;
  defaultDarkMode?: boolean;
}

export const App = ({ children, defaultDarkMode }: AppProps) => {
  return <ThemeProvider defaultDarkMode={defaultDarkMode}>{children}</ThemeProvider>;
};
