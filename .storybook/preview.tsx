import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#F3F4F6",
        },
        {
          name: "dark",
          value: "#111827",
        },
      ],
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
