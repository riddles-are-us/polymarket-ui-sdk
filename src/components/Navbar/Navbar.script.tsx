import { useCallback, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

interface UseNavbarOptions {
  loginText?: string;
  signUpText?: string;
}

export const useNavbar = (options: UseNavbarOptions = {}) => {
  const { loginText, signUpText } = options;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>();
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  const handleSearch = useCallback((query: string) => {
    console.log("Search:", query);
    // Implement search logic
  }, []);

  const handleLogin = useCallback(() => {
    console.log("Login clicked");
    setIsLoggedIn(true);
    setUserName("John Doe"); // Mock user data
  }, []);

  const handleSignUp = useCallback(() => {
    console.log("Sign up clicked");
    // Implement sign up logic
  }, []);

  const handleProfileClick = useCallback(() => {
    console.log("Profile clicked");
    // Implement profile menu logic
  }, []);

  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    // Implement navigation to home
  }, []);

  const defaultMenuItems = [
    { label: "Markets", onClick: () => console.log("Markets clicked") },
    { label: "Dashboards", onClick: () => console.log("Dashboards clicked") },
    { label: "Sports", onClick: () => console.log("Sports clicked") },
    { label: "Activity", onClick: () => console.log("Activity clicked") },
    { label: "Ranks", onClick: () => console.log("Ranks clicked") },
  ];

  return {
    logo: {
      text: "Polymarket",
      onClick: handleLogoClick,
    },
    search: {
      placeholder: "Search markets",
      onSearch: handleSearch,
    },
    menuItems: defaultMenuItems,
    auth: {
      isLoggedIn,
      userName,
      onLogin: handleLogin,
      onSignUp: handleSignUp,
      onProfileClick: handleProfileClick,
      loginText,
      signUpText,
    },
    darkMode: {
      enabled: isDarkMode,
      onToggle: toggleDarkMode,
    },
  };
};
