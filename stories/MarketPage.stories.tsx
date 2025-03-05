import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MarketPageUI, MarketPageWidget } from "../src/components/MarketPage";
import { ThemeProvider } from "../src/contexts/ThemeContext";

const meta: Meta<typeof MarketPageUI> = {
  title: "Pages/MarketPage",
  component: MarketPageUI,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MarketPageUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "custom-class",
  },
};

export const WithWidget: Story = {
  render: () => <MarketPageWidget />,
};
