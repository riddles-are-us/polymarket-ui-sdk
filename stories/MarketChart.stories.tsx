import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MarketChartUI, MarketChartWidget } from "../src/components/MarketChart";

const meta = {
  title: "Components/MarketChart",
  component: MarketChartUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MarketChartUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Market",
    subtitle: "Volume: $1.2M • End Date: Dec 31, 2024",
    mainValue: "75",
    changeValue: 2.5,
    chartData: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      price: 75 + Math.random() * 10 - 5,
    })),
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
