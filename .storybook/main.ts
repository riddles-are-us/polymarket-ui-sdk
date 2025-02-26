import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins || [])],
      optimizeDeps: {
        include: ["storybook-dark-mode"],
      },
      resolve: {
        alias: {
          ...config.resolve?.alias,
        },
      },
    };
  },
};
export default config;
