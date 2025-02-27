import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MarketChartUI, MarketChartWidget } from "../src/components/MarketChart";
import { ThemeProvider } from "../src/contexts/ThemeContext";

const meta: Meta<typeof MarketChartUI> = {
  title: "Components/MarketChart",
  component: MarketChartUI,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MarketChartUI>;

const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  date: new Date(2024, 0, 1, i).toISOString(),
  price: 50 + Math.random() * 20,
}));

export const Default: Story = {
  args: {
    title: "Will Trump Win in 2024?",
    subtitle: "Presidential Election Market",
    mainValue: "64",
    mainValueUnit: "¢",
    changeValue: 2.5,
    chartData: mockChartData,
    actions: {
      onBookmark: () => console.log("Bookmark clicked"),
      onShare: () => console.log("Share clicked"),
      onCopy: () => console.log("Copy clicked"),
    },
  },
};

export const WithNegativeChange: Story = {
  args: {
    ...Default.args,
    changeValue: -2.5,
  },
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: {
      onBookmark: () => console.log("Bookmark clicked"),
      onShare: () => console.log("Share clicked"),
      onCopy: () => console.log("Copy clicked"),
    },
  },
};

export const WithWidget: Story = {
  args: {
    ...Default.args,
  },
  render: () => <MarketChartWidget />,
};
