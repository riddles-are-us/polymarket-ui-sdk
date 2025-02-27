import React, { useState } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  Bars3Icon as MenuIcon,
  UserCircleIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { NavigationBottomUI, NavigationItem } from "./components/NavigationBottom";
import { SettingsDropdown } from "./components/SettingsDropdown";

export interface NavbarUIProps {
  logo: {
    text: string;
    onClick?: () => void;
  };
  search?: {
    placeholder?: string;
    onSearch: (query: string) => void;
  };
  menuItems?: NavigationItem[];
  auth?: {
    isLoggedIn: boolean;
    userName?: string;
    onLogin?: () => void;
    onSignUp?: () => void;
    onProfileClick?: () => void;
  };
  darkMode: {
    enabled: boolean;
    onToggle: () => void;
  };
  onNavigate?: (path: string) => void;
  className?: string;
}

export const NavbarUI: React.FC<NavbarUIProps> = ({
  logo,
  search,
  menuItems = [],
  auth,
  darkMode,
  onNavigate,
  className = "",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const defaultMenuItems: NavigationItem[] = [
    { label: "Markets", icon: Squares2X2Icon },
    { label: "Dashboards", icon: ChartBarIcon },
    { label: "Sports", icon: TrophyIcon },
    { label: "Activity", icon: BellIcon },
    { label: "Ranks", icon: TrophyIcon },
  ];

  const combinedMenuItems = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <div className={`flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${className}`}>
      <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left section: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="text-xl font-bold cursor-pointer flex items-center space-x-2" onClick={logo.onClick}>
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z" />
              </svg>
              <span className="hidden sm:inline text-gray-900 dark:text-white">{logo.text}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {combinedMenuItems.map((item, index) => {
                const Icon = item.icon;
                if (!Icon) return null;

                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-3xl mx-8">
            {search && (
              <div className="relative">
                <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={search.placeholder || "Search markets"}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white pl-10 pr-4 py-2 rounded-full 
                           border border-gray-200 dark:border-gray-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onChange={(e) => search.onSearch(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Right section: Auth */}
          <div className="flex items-center space-x-3">
            {auth &&
              (!auth.isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {auth.onLogin && (
                    <button
                      onClick={auth.onLogin}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm hidden sm:block"
                    >
                      Log In
                    </button>
                  )}
                  {auth.onSignUp && (
                    <button
                      onClick={auth.onSignUp}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300">{auth.userName}</span>
                  <UserCircleIcon
                    className="h-8 w-8 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                    onClick={auth.onProfileClick}
                  />
                </div>
              ))}
            <SettingsDropdown darkMode={darkMode} onNavigate={onNavigate} auth={auth} />
          </div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="bg-white dark:bg-gray-900 text-sm border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-2">
            <span className="text-red-500 font-medium whitespace-nowrap">LIVE</span>
            <span className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer whitespace-nowrap">
              All
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              New
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Politics
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Sports
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Crypto
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Trump
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Global Elections
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Elon Tweets
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Mentions
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Creators
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Pop Culture
            </span>
            <span className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer whitespace-nowrap">
              Business
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search - Only visible when search is open */}
      <div className={`md:hidden bg-white dark:bg-gray-900 p-4 ${isSearchOpen ? "block" : "hidden"}`}>
        {search && (
          <div className="relative">
            <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={search.placeholder || "Search markets"}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white pl-10 pr-4 py-2 rounded-full 
                       border border-gray-200 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onChange={(e) => search.onSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <NavigationBottomUI items={combinedMenuItems} onSearchClick={() => setIsSearchOpen(!isSearchOpen)} />
    </div>
  );
};
