import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-onboarding", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const plugin = (await import("@tailwindcss/vite")).default;
    config.plugins = config.plugins ?? [];
    config.plugins.push(plugin());
    return config;
  },
};

export default config;
