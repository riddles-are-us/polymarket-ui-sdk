import React from "react";

export interface NavbarProps {
  onSearch?: (query: string) => void;
  onLogin?: () => void;
  onSignUp?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onLogin, onSignUp, isLoggedIn, userName }) => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">Polymarket</div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search markets"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
            <button className="hover:text-blue-400">Markets</button>
            <button className="hover:text-blue-400">Dashboards</button>
            <button className="hover:text-blue-400">Sports</button>
            <button className="hover:text-blue-400">Activity</button>
            <button className="hover:text-blue-400">Ranks</button>
          </div>

          {!isLoggedIn ? (
            <div className="flex space-x-4">
              <button onClick={onLogin} className="text-blue-400 hover:text-blue-300">
                Log In
              </button>
              <button onClick={onSignUp} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>{userName}</span>
              <button className="text-gray-400 hover:text-white">
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
          )}
        </div>
      </div>
    </nav>
  );
};
