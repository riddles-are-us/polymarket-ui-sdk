import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OrderBookUI, OrderBookWidget } from "../src/components/OrderBook";

const meta = {
  title: "Components/OrderBook",
  component: OrderBookUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderBookUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAsks = Array.from({ length: 5 }, (_, i) => ({
  price: 75 + i * 0.5,
  quantity: Math.floor(Math.random() * 10000) + 1000,
  total: Math.floor(Math.random() * 10000) + 1000,
}));

const mockBids = Array.from({ length: 5 }, (_, i) => ({
  price: 75 - i * 0.5,
  quantity: Math.floor(Math.random() * 10000) + 1000,
  total: Math.floor(Math.random() * 10000) + 1000,
}));

export const Default: Story = {
  args: {
    asks: mockAsks,
    bids: mockBids,
    summary: {
      lastPrice: 75,
      spread: 0.5,
    },
  },
};

export const WithCustomConfig: Story = {
  args: {
    ...Default.args,
    config: {
      priceUnit: "$",
      quantityLabel: "Amount",
      totalLabel: "Value",
      askColor: "text-orange-500",
      bidColor: "text-blue-500",
    },
  },
};

export const WithWidget: Story = {
  args: {
    ...Default.args,
  },
  render: () => <OrderBookWidget />,
};
