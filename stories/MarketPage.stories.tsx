import type { Meta, StoryObj } from "@storybook/react";
import { MarketPage } from "../src/components/MarketPage/MarketPage";

const meta: Meta<typeof MarketPage> = {
  title: "Pages/MarketPage",
  component: MarketPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MarketPage>;

const mockData = {
  marketData: {
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
  orderBook: {
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
  comments: [
    {
      id: "1",
      author: {
        name: "Hoviking",
        position: "92 No",
      },
      content: "I can't possibly understand that YE wants to do his own coin lol",
      timestamp: "19m ago",
      likes: 0,
    },
    {
      id: "2",
      author: {
        name: "sox",
        position: "8 No",
      },
      content: "positive pnl",
      timestamp: "42m ago",
      likes: 0,
    },
    {
      id: "3",
      author: {
        name: "Iranon",
        position: "14.0K Yes",
      },
      content: "If you're an insider and still lose money on this market, then I just can't find words to condemn you.",
      timestamp: "56m ago",
      likes: 3,
      userHasLiked: true,
    },
  ],
  totalComments: 10448,
};

export const Default: Story = {
  args: mockData,
};
