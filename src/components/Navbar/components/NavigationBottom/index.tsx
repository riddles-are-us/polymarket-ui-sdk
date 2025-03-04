import React from "react";
import { Squares2X2Icon, ChartBarIcon, BellIcon, StarIcon, TrophyIcon } from "@heroicons/react/24/outline";

export interface NavigationItem {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export interface NavigationBottomUIProps {
  items?: NavigationItem[];
  onSearchClick?: () => void;
  className?: string;
}

export const NavigationBottomUI: React.FC<NavigationBottomUIProps> = ({ items, onSearchClick, className = "" }) => {
  const defaultItems = [
    { label: "Markets", icon: Squares2X2Icon },
    { label: "Dashboards", icon: ChartBarIcon },
    { label: "Sports", icon: StarIcon },
    { label: "Activity", icon: BellIcon },
    { label: "Ranks", icon: TrophyIcon },
  ];

  const navigationItems = items || defaultItems;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 w-full ${className}`}
      style={{ height: "auto" }}
    >
      <div className="w-full grid grid-cols-5 px-4 py-1">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          if (!Icon) return null;

          return (
            <button
              key={index}
              onClick={() => {
                if (item.label === "Search" && onSearchClick) {
                  onSearchClick();
                } else {
                  item.onClick?.();
                }
              }}
              className="flex flex-col items-center justify-center py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icon className="h-5 w-5 mb-1.5" />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
      {/* Add safe area padding for mobile devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
};
