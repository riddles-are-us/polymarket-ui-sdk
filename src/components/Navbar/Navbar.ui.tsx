import React from "react";

export interface NavbarUIProps {
  logo: {
    text: string;
    onClick?: () => void;
  };
  search?: {
    placeholder?: string;
    onSearch: (query: string) => void;
  };
  menuItems?: Array<{
    label: string;
    onClick?: () => void;
  }>;
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
  return (
    <nav className={`bg-gray-900 text-white p-4 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold cursor-pointer" onClick={logo.onClick}>
            {logo.text}
          </div>
          {search && (
            <div className="relative">
              <input
                type="text"
                placeholder={search.placeholder || "Search"}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => search.onSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          {menuItems.length > 0 && (
            <div className="flex space-x-4">
              {menuItems.map((item, index) => (
                <button key={index} onClick={item.onClick} className="hover:text-blue-400">
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {auth &&
            (!auth.isLoggedIn ? (
              <div className="flex space-x-4">
                {auth.onLogin && (
                  <button onClick={auth.onLogin} className="text-blue-400 hover:text-blue-300">
                    Log In
                  </button>
                )}
                {auth.onSignUp && (
                  <button
                    onClick={auth.onSignUp}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{auth.userName}</span>
                <button onClick={auth.onProfileClick} className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
};
