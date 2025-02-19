import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../src/components/core/Button/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Button component is a fundamental building block for user interactions.
It supports different variants and sizes to accommodate various use cases.

## Usage

\`\`\`jsx
import { Button } from 'polymarket-ui-sdk';

function MyComponent() {
  return (
    <Button variant="primary" size="medium">
      Click me
    </Button>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "The visual style of the button",
      control: "select",
      options: ["primary", "secondary"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: "The size of the button",
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
      },
    },
    children: {
      description: "The content of the button",
      control: "text",
    },
    className: {
      description: "Additional CSS classes to apply",
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Custom Styled Button",
    className: "shadow-lg hover:shadow-xl",
  },
};
