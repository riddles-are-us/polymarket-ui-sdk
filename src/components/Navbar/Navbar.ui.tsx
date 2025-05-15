import React, { useState, useRef, useEffect } from "react";
import {
  Squares2X2Icon,
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  TrophyIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { NavigationBottomUI, NavigationItem } from "./components/NavigationBottom";
import { SettingsDropdown } from "./components/SettingsDropdown";
import { useMediaQuery } from "../../hooks/useMediaQuery";

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
    loginText?: string;
    signUpText?: string;
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
  const [showDesktopNav, setShowDesktopNav] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const navElement = entry.target as HTMLElement;
        const logoWidth = navElement.querySelector('[data-testid="logo"]')?.clientWidth || 0;
        const authWidth = navElement.querySelector('[data-testid="auth"]')?.clientWidth || 0;
        const availableWidth = containerWidth - logoWidth - authWidth - 48;

        const menuContainer = navElement.querySelector('[data-testid="menu-container"]') as HTMLElement;
        if (menuContainer) {
          const shouldShowDesktop = availableWidth >= menuContainer.scrollWidth;
          setShowDesktopNav(shouldShowDesktop);
        }
      }
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  const defaultMenuItems: NavigationItem[] = [
    { label: "Markets", icon: Squares2X2Icon },
    { label: "Dashboards", icon: ChartBarIcon },
    { label: "Sports", icon: StarIcon },
    { label: "Activity", icon: BellIcon },
    { label: "Ranks", icon: TrophyIcon },
  ];

  const combinedMenuItems = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <div className={`flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-full ${className}`}>
      <nav
        ref={navRef}
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-800 w-full"
      >
        <div className="w-full flex items-center justify-between">
          {/* Left section: Logo and Navigation */}
          <div className="flex items-center space-x-4 lg:space-x-8 flex-shrink-0">
            {/* Logo */}
            <div
              data-testid="logo"
              className="text-xl font-bold cursor-pointer flex items-center space-x-2"
              onClick={logo.onClick}
            >
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z" />
              </svg>
              <span className="hidden sm:inline text-gray-900 dark:text-white">{logo.text}</span>
            </div>

            {/* Desktop Navigation */}
            <div
              data-testid="menu-container"
              className={`hidden ${showDesktopNav ? "md:flex" : ""} items-center gap-2 lg:gap-4`}
            >
              {combinedMenuItems.map((item, index) => {
                const Icon = item.icon;
                if (!Icon) return null;

                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 px-2 text-sm whitespace-nowrap min-w-0"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Search - 只在大屏幕上显示，完全不影响小屏幕布局 */}
          <div data-testid="search" className="hidden lg:block lg:flex-1 lg:max-w-2xl lg:mx-4">
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
          <div data-testid="auth" className="flex items-center space-x-3">
            {auth &&
              (!auth.isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {auth.onLogin && (
                    <button
                      onClick={auth.onLogin}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm hidden sm:block w-20"
                    >
                      {auth.loginText || "Log In"}
                    </button>
                  )}
                  {auth.onSignUp && (
                    <button
                      onClick={auth.onSignUp}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium w-24"
                    >
                      {auth.signUpText || "Sign Up"}
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
      {/* <div
        className="bg-white dark:bg-gray-900 text-sm border-b border-gray-200 dark:border-gray-800 overflow-x-auto w-full"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="w-full px-4">
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
      </div> */}

      {/* Mobile Search - Only visible when search is open */}
      <div className={`md:hidden bg-white dark:bg-gray-900 p-4 w-full ${isSearchOpen ? "block" : "hidden"}`}>
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
      <NavigationBottomUI
        items={combinedMenuItems}
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
        className={`${showDesktopNav ? "md:hidden" : ""} ${isMobile ? "z-10 pb-safe" : ""}`}
      />
    </div>
  );
};
