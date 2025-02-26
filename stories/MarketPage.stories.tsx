import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MarketPageUI, MarketPageWidget } from "../src/components/MarketPage";

const meta = {
  title: "Pages/MarketPage",
  component: MarketPageUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MarketPageUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    marketId: "mock-market-1",
  },
};

export const WithWidget: Story = {
  args: {
    marketId: "mock-market-1",
  },
  render: (args) => <MarketPageWidget {...args} />,
};
