import { useCallback, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

export const useNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [userName, setUserName] = useState("");
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

  const handleConnect = useCallback(() => {
    console.log("Connect clicked");
    setIsConnected(true);
    setWalletAddress("0x1");
    // Implement connect logic
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
      isConnected,
      walletAddress,
      userName,
      onLogin: handleLogin,
      onConnect: handleConnect,
      onProfileClick: handleProfileClick,
    },
    darkMode: {
      enabled: isDarkMode,
      onToggle: toggleDarkMode,
    },
  };
};
