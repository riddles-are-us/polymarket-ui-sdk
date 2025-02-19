import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "../../../src/components/core/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    initialQuery: "",
    debounceMs: 300,
  },
};

export const WithInitialQuery: Story = {
  args: {
    initialQuery: "initial search",
    debounceMs: 300,
  },
};

export const FastDebounce: Story = {
  args: {
    initialQuery: "",
    debounceMs: 100,
  },
};
