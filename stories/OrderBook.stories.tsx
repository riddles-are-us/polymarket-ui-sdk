import type { Meta, StoryObj } from "@storybook/react";
import { OrderBook } from "../src/components/OrderBook/OrderBook";

const meta: Meta<typeof OrderBook> = {
  title: "Components/OrderBook",
  component: OrderBook,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof OrderBook>;

export const Default: Story = {
  args: {
    asks: [
      { price: 24, shares: 1629.76, total: 10625.57 },
      { price: 23, shares: 24160.8, total: 10234.43 },
      { price: 22, shares: 15056.57, total: 4677.45 },
      { price: 21, shares: 6499.99, total: 1365.0 },
    ],
    bids: [
      { price: 20, shares: 5383.83, total: 1076.77 },
      { price: 19, shares: 9668.25, total: 2913.74 },
      { price: 18, shares: 29121.92, total: 8155.69 },
      { price: 17, shares: 23501.68, total: 12150.98 },
    ],
    lastPrice: 21,
    spread: 1,
  },
};
