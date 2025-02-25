import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "../../../src/components/core/NavBar";
import { 
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import React from "react";

const defaultItems = [
  { icon: <HomeIcon />, label: '首页', href: '/' },
  { icon: <UserIcon />, label: '用户', href: '/user' },
  { icon: <ShoppingCartIcon />, label: '购物车', href: '/cart' },
  { icon: <HeartIcon />, label: '收藏', href: '/favorites' },
  { icon: <Cog6ToothIcon />, label: '设置', href: '/settings' },
];

const meta = {
  title: "Components/NavBar",
  component: NavBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
NavBar 是一个响应式导航栏组件，可以根据屏幕尺寸自动调整位置和布局。

## 特点
- 响应式设计：在大屏幕显示在顶部，小屏幕显示在底部
- 支持图标和文字
- 可自定义位置
- 自动处理激活状态

## 用法

\`\`\`jsx
import { NavBar } from 'your-component-library';
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

const items = [
  { icon: <HomeIcon />, label: '首页', href: '/' },
  { icon: <UserIcon />, label: '用户', href: '/user' },
];

function App() {
  return <NavBar items={items} position="top" />;
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      description: "导航栏位置",
      options: ['top', 'bottom'],
      control: { type: 'radio' },
      defaultValue: 'top'
    },
    items: {
      description: "导航项列表",
      control: "object"
    }
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础导航栏
export const Default: Story = {
  args: {
    items: defaultItems,
    position: 'top'
  }
};

// 底部导航栏
export const BottomNav: Story = {
  args: {
    items: defaultItems,
    position: 'bottom'
  }
};

// 响应式演示
export const Responsive: Story = {
  args: {
    items: defaultItems,
    position: 'top'
  },
  parameters: {
    docs: {
      description: {
        story: '调整浏览器窗口大小来查看响应式效果。在小屏幕（<768px）时会自动切换到底部。'
      }
    }
  }
};

// 不同数量的导航项
export const FewItems: Story = {
  args: {
    items: defaultItems.slice(0, 3),
    position: 'top'
  }
};

// 模拟页面内容的完整示例
export const WithContent: Story = {
  args: {
    items: defaultItems,
    position: 'top'
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-100">
      <NavBar {...args} />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">页面内容</h1>
          <p className="text-gray-600">
            这是一个示例内容，用来展示导航栏在实际页面中的效果。
            调整窗口大小可以看到导航栏的响应式变化。
          </p>
        </div>
      </div>
    </div>
  )
};

// 自定义样式示例
export const CustomStyle: Story = {
  args: {
    items: defaultItems.slice(0, 4),
    position: 'top'
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-8">
        <NavBar {...args} />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">导航栏说明</h2>
          <p className="text-gray-600">
            导航栏会根据屏幕尺寸自动调整其位置和布局：
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>大屏幕：水平排列在顶部</li>
            <li>小屏幕：垂直排列在底部</li>
            <li>图标大小会根据屏幕尺寸自动调整</li>
            <li>支持激活状态显示</li>
          </ul>
        </div>
      </div>
    </div>
  )
}; 