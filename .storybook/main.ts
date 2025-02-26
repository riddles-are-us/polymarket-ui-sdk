import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: "Documentation",
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config) => {
    return {
      ...config,
      define: {
        ...config.define,
        "process.env": {},
      },
      optimizeDeps: {
        include: ["storybook-dark-mode"],
      },
      resolve: {
        alias: {
          ...config.resolve?.alias,
        },
        dedupe: ["@storybook/blocks", "react", "react-dom"],
      },
    };
  },
};

export default config;
