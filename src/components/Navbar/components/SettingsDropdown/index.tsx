import React, { useState, useRef, useEffect } from "react";
import { Cog6ToothIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export interface SettingsDropdownProps {
  darkMode: {
    enabled: boolean;
    onToggle: () => void;
  };
  onNavigate?: (path: string) => void;
  auth?: {
    isLoggedIn: boolean;
    onLogin?: () => void;
    onSignUp?: () => void;
    loginText?: string;
    signUpText?: string;
  };
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ darkMode, onNavigate, auth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Elections", path: "/elections" },
    { label: "Sports", path: "/sports" },
    { label: "Rewards", path: "/rewards" },
    { label: "Learn", path: "/learn" },
    { label: "Documentation", path: "/docs" },
    { label: "Terms of Use", path: "/terms" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Cog6ToothIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
          <div className="py-2">
            {/* Auth Section */}
            {auth && !auth.isLoggedIn && (
              <>
                {auth.onLogin && (
                  <button
                    onClick={() => {
                      if (auth.onLogin) auth.onLogin();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {auth.loginText || "Log In"}
                  </button>
                )}
                {auth.onSignUp && (
                  <button
                    onClick={() => {
                      if (auth.onSignUp) auth.onSignUp();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {auth.signUpText || "Sign Up"}
                  </button>
                )}
                <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>
              </>
            )}

            {/* Navigation Items */}
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  onNavigate?.(item.path);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

            {/* Theme Selector */}
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode.enabled ? (
                  <MoonIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                ) : (
                  <SunIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                )}
                <span className="text-gray-700 dark:text-gray-300">{darkMode.enabled ? "Dark" : "Light"} mode</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  darkMode.onToggle();
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode.enabled ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
