import type { Meta, StoryObj } from "@storybook/react";
import { NavbarUI } from "../src/components/Navbar";

const meta: Meta<typeof NavbarUI> = {
  title: "Components/Navbar",
  component: NavbarUI,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: {
      text: "Storybook",
      onClick: () => console.log("Logo clicked"),
    },
    auth: {
      isLoggedIn: true,
      userName: "John Doe",
      onProfileClick: () => console.log("Profile clicked"),
    },
  },
};

export const LoggedOut: Story = {
  args: {
    logo: {
      text: "Storybook",
    },
    auth: {
      isLoggedIn: false,
      onLogin: () => console.log("Login clicked"),
      onSignUp: () => console.log("Sign up clicked"),
    },
  },
};

export const WithSearch: Story = {
  args: {
    ...Default.args,
    search: {
      placeholder: "Search...",
      onSearch: (query) => console.log("Search:", query),
    },
  },
};
