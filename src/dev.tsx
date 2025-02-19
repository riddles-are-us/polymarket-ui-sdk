import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/core/Button/Button";
import { useTheme } from "./hooks/useTheme";

const App = () => {
  const { theme, updateTheme } = useTheme();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Polymarket UI SDK Development</h1>

      <div className="space-y-4">
        <div className="space-x-2">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>

        <div className="space-x-2">
          <Button size="small">Small Button</Button>
          <Button size="medium">Medium Button</Button>
          <Button size="large">Large Button</Button>
        </div>

        <div>
          <Button variant="primary" onClick={() => updateTheme({ primary: "#FF0000" })}>
            Change Theme Color
          </Button>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
