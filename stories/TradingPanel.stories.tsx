import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TradingPanelUI, TradingPanelWidget } from "../src/components/TradingPanel";

const meta = {
  title: "Components/TradingPanel",
  component: TradingPanelUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TradingPanelUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPrice: 75,
    selectedTab: "buy",
    amount: "100",
    maxAmount: 1000,
    onTabChange: (tab) => console.log("Tab changed:", tab),
    onAmountChange: (amount) => console.log("Amount changed:", amount),
    onQuickAmountClick: (amount) => console.log("Quick amount clicked:", amount),
    onSubmit: () => console.log("Submit clicked"),
  },
};

export const SellTab: Story = {
  args: {
    ...Default.args,
    selectedTab: "sell",
  },
};

export const CustomConfig: Story = {
  args: {
    ...Default.args,
    config: {
      buyButtonText: "Purchase",
      sellButtonText: "Sell Now",
      buyButtonColor: "bg-blue-600 hover:bg-blue-700",
      sellButtonColor: "bg-orange-600 hover:bg-orange-700",
      disclaimer: "Trading involves risk",
    },
  },
};

export const WithWidget: Story = {
  args: {
    ...Default.args,
  },
  render: () => <TradingPanelWidget currentPrice={75} maxAmount={1000} />,
};
