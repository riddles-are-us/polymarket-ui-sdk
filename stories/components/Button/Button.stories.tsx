import type { Meta, StoryObj } from "@storybook/react";
// import { Button } from "../../../src/components/core/Button/Button";
import { Button } from "../../../src/components/core/Button";
import { 
  MagnifyingGlassIcon,
  PencilIcon, 
  TrashIcon,
  // 其他图标...
} from "@heroicons/react/24/outline";
import React from "react";

// 定义一个图标映射对象
const iconMapping = {
  none: null,
  search: <MagnifyingGlassIcon />,
  edit: <PencilIcon />,
  delete: <TrashIcon />,
  // 添加其他图标...
};

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Button component is a fundamental building block for user interactions.
It supports icons, text, loading and disabled states.

## Usage

\`\`\`jsx
import { Button } from 'polymarket-ui-sdk';

function MyComponent() {
  return (
    <Button 
      icon={<MagnifyingGlassIcon />}
      text="search"
      onClick={() => console.log('clicked')}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      description: "按钮文字",
      control: "text",
    },
    icon: {
      description: "按钮图标",
      options: Object.keys(iconMapping), // 使用图标映射的键作为选项
      control: { type: 'select' },
      mapping: iconMapping, // 使用图标映射
    },
    disabled: {
      description: "是否禁用",
      control: "boolean",
    },
    loading: {
      description: "是否加载中",
      control: "boolean",
    },
    onClick: {
      description: "点击事件处理函数",
      action: "clicked",
    },
    size: {
      description: "按钮尺寸",
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      defaultValue: 'medium'
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础按钮
export const Basic: Story = {
  args: {
    text: "Basic",
  },
};

// 带图标的按钮
export const WithIcon: Story = {
  args: {
    // icon: <MagnifyingGlassIcon className="h-5 w-5" />,
    icon: 'search',
    text: "search",
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    text: "disabled",
    disabled: true,
  },
};

// 加载状态
export const Loading: Story = {
  args: {
    text: "loading",
    loading: true,
  },
};

// 带图标和加载状态
export const IconWithLoading: Story = {
  args: {
    // icon: <MagnifyingGlassIcon className="h-5 w-5" />,
    icon: 'search',
    text: "searching",
    loading: true,
  },
};

// 添加不同尺寸的按钮示例
export const Small: Story = {
  args: {
    text: "Small Button",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    text: "Medium Button",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    text: "Large Button",
    size: "large",
  },
};

export const IconSizes: Story = {
  args: {
    icon: <MagnifyingGlassIcon />,
  },
  render: (args) => (
    <div className="flex gap-4 items-center">
      <Button {...args} text="Small" size="small" />
      <Button {...args} text="Medium" size="medium" />
      <Button {...args} text="Large" size="large" />
    </div>
  ),
};
