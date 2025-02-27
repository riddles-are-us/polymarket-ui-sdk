import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TradingPanelUI, TradingPanelWidget } from "../src/components/TradingPanel";
import { ThemeProvider } from "../src/contexts/ThemeContext";

const meta: Meta<typeof TradingPanelUI> = {
  title: "Components/TradingPanel",
  component: TradingPanelUI,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TradingPanelUI>;

export default meta;
type Story = StoryObj<typeof TradingPanelUI>;

export const Default: Story = {
  args: {
    currentPrice: 64,
    selectedTab: "buy",
    amount: "",
    maxAmount: 1000,
    priceUnit: "¢",
    quickAmounts: [10, 50, 100, "Max"],
    config: {
      buyButtonText: "Buy Yes",
      sellButtonText: "Buy No",
      buyButtonColor: "bg-green-600 hover:bg-green-700",
      sellButtonColor: "bg-red-600 hover:bg-red-700",
      disclaimer: "By trading, you agree to the Terms of Use",
    },
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
