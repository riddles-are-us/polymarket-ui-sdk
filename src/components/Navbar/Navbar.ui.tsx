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
import { NavigationBottomUI, NavigationItem } from "./NavigationBottom";

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
  className?: string;
}

export const NavbarUI: React.FC<NavbarUIProps> = ({ logo, search, menuItems = [], auth, className = "" }) => {
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
    <div className={`flex flex-col ${className}`}>
      <nav className="bg-gray-900 text-white px-4 py-3 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left section: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="text-xl font-bold cursor-pointer flex items-center space-x-2" onClick={logo.onClick}>
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z" />
              </svg>
              <span className="hidden sm:inline">{logo.text}</span>
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
                    className="flex items-center space-x-2 text-gray-400 hover:text-white px-3 py-1"
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
                  className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
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
                      className="text-blue-400 hover:text-blue-300 text-sm hidden sm:block"
                    >
                      Log In
                    </button>
                  )}
                  {auth.onSignUp && (
                    <button
                      onClick={auth.onSignUp}
                      className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 text-sm font-medium"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:inline text-sm">{auth.userName}</span>
                  <UserCircleIcon
                    className="h-8 w-8 text-gray-400 hover:text-white cursor-pointer"
                    onClick={auth.onProfileClick}
                  />
                </div>
              ))}
          </div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="bg-gray-900 text-sm border-b border-gray-800 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-2">
            <span className="text-red-500 font-medium whitespace-nowrap">LIVE</span>
            <span className="text-white hover:text-gray-300 cursor-pointer whitespace-nowrap">All</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">New</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Politics</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Sports</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Crypto</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Trump</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Global Elections</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Elon Tweets</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Mentions</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Creators</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Pop Culture</span>
            <span className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Business</span>
          </div>
        </div>
      </div>

      {/* Mobile Search - Only visible when search is open */}
      <div className={`md:hidden bg-gray-900 p-4 ${isSearchOpen ? "block" : "hidden"}`}>
        {search && (
          <div className="relative">
            <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={search.placeholder || "Search markets"}
              className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
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
