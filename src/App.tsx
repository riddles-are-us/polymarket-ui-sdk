import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

interface AppProps {
  children?: React.ReactNode;
}

export const App: React.FC<AppProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
