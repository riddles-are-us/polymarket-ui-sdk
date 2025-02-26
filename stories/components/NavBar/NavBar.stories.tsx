import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "../../../src/components/core/NavBar";
import { Button } from "../../../src/components/core/Button";

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
NavBar 是一个响应式导航栏组件，可以根据屏幕尺寸和位置设置自动调整布局。

## 特点
- 响应式设计：在大屏幕显示在顶部（靠右），小屏幕显示在底部（均匀分布）
- 支持图标和文字
- 可自定义位置
- 自动处理激活状态
- 顶部时靠右对齐，底部时均匀分布

## 用法

\`\`\`jsx
import { NavBar } from 'polymarket-ui-sdk';
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

// 顶部导航栏（靠右）
export const TopNav: Story = {
  args: {
    items: defaultItems,
    position: 'top'
  },
  parameters: {
    docs: {
      description: {
        story: '顶部导航栏示例，导航项靠右对齐。'
      }
    }
  }
};

// 底部导航栏（均匀分布）
export const BottomNav: Story = {
  args: {
    items: defaultItems,
    position: 'bottom'
  },
  parameters: {
    docs: {
      description: {
        story: '底部导航栏示例，导航项均匀分布。'
      }
    }
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
  },
  parameters: {
    docs: {
      description: {
        story: '展示较少导航项的布局效果。顶部时靠右对齐，底部时均匀分布。'
      }
    }
  }
};

// 带按钮的导航栏示例
export const WithButton: Story = {
  args: {
    items: [
      { icon: <HomeIcon />, label: '首页', href: '/' },
      { icon: <UserIcon />, label: '用户', href: '/user' },
      {
        icon: <Button 
          icon={<ShoppingCartIcon />}
          text="购物车" 
          size="small"
        />,
        label: '',  // 使用Button组件时不需要额外的label
        href: '/cart'
      },
      {
        icon: <Button 
          icon={<HeartIcon />}
          text="收藏" 
          size="small"
        />,
        label: '',
        href: '/favorites'
      }
    ],
    position: 'top'
  },
  parameters: {
    docs: {
      description: {
        story: '展示如何在导航栏中嵌套使用Button组件，可以创建更丰富的导航项样式。'
      }
    }
  }
};