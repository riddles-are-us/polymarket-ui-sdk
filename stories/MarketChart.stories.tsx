import type { Meta, StoryObj } from "@storybook/react";
import { MarketChart } from "../src/components/MarketChart/MarketChart";

const meta: Meta<typeof MarketChart> = {
  title: "Components/MarketChart",
  component: MarketChart,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MarketChart>;

export const Default: Story = {
  args: {
    data: {
      title: "Will Kanye launch a coin in February?",
      volume: "$23,699,480",
      endDate: "Feb 28, 2025",
      currentPrice: 23,
      priceChange: 1.2,
      chartData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 1, i + 1).toISOString(),
        price: Math.random() * 30 + 10,
      })),
    },
  },
};

export const Negative: Story = {
  args: {
    data: {
      title: "Will Kanye launch a coin in February?",
      volume: "$23,699,480",
      endDate: "Feb 28, 2025",
      currentPrice: 23,
      priceChange: -2.5,
      chartData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 1, i + 1).toISOString(),
        price: Math.random() * 30 + 10,
      })),
    },
  },
};
