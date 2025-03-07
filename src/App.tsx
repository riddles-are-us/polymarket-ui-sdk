import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

interface AppProps {
  children?: React.ReactNode;
}

export const App = ({ children }: AppProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
