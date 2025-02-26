import type { Meta, StoryObj } from "@storybook/react";
import { Comments } from "../src/components/Comments/Comments";

const meta: Meta<typeof Comments> = {
  title: "Components/Comments",
  component: Comments,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Comments>;

export const Default: Story = {
  args: {
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
        content:
          "If you're an insider and still lose money on this market, then I just can't find words to condemn you.",
        timestamp: "56m ago",
        likes: 3,
        userHasLiked: true,
      },
    ],
    totalComments: 10448,
  },
};
