import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CommentsUI, CommentsWidget } from "../src/components/Comments";

const meta = {
  title: "Components/Comments",
  component: CommentsUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommentsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockComments = [
  {
    id: "1",
    author: {
      name: "John Doe",
      position: "Market Analyst",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    content: "This market is showing strong potential for growth in the coming weeks.",
    timestamp: "2 hours ago",
    likes: 24,
    userHasLiked: false,
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      position: "Trader",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    content: "The recent price movement suggests a bullish trend.",
    timestamp: "5 hours ago",
    likes: 15,
    userHasLiked: true,
  },
];

export const Default: Story = {
  args: {
    comments: mockComments,
    totalComments: mockComments.length,
    onAddComment: (content) => console.log("Add comment:", content),
    onLikeComment: (id) => console.log("Like comment:", id),
  },
};

export const WithCustomConfig: Story = {
  args: {
    ...Default.args,
    title: "Discussion",
    newCommentPlaceholder: "Join the discussion...",
    config: {
      submitButtonText: "Send",
      submitButtonColor: "bg-green-500 hover:bg-green-600",
    },
  },
};

export const WithCustomSort: Story = {
  args: {
    ...Default.args,
    sortOptions: [
      { label: "Most Recent", value: "recent" },
      { label: "Most Liked", value: "liked" },
      { label: "Most Active", value: "active" },
    ],
    selectedSort: "recent",
    onSortChange: (value) => console.log("Sort changed:", value),
  },
};

export const WithWidget: Story = {
  args: {
    comments: mockComments,
    totalComments: mockComments.length,
    onAddComment: (content) => console.log("Add comment:", content),
    onLikeComment: (id) => console.log("Like comment:", id),
  },
  render: () => <CommentsWidget />,
};
