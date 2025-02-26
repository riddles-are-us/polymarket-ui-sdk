import type { Meta, StoryObj } from "@storybook/react";
import { TradingPanel } from "../src/components/TradingPanel/TradingPanel";

const meta: Meta<typeof TradingPanel> = {
  title: "Components/TradingPanel",
  component: TradingPanel,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TradingPanel>;

export const Default: Story = {
  args: {
    currentPrice: 23,
    maxAmount: 1000,
  },
};
