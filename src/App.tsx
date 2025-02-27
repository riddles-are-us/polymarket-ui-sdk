import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

export const App: React.FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
