import React from "react";
import { Squares2X2Icon, ChartBarIcon, BellIcon, TrophyIcon } from "@heroicons/react/24/outline";

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
    { label: "Sports", icon: TrophyIcon },
    { label: "Activity", icon: BellIcon },
    { label: "Ranks", icon: TrophyIcon },
  ];

  const navigationItems = items || defaultItems;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 md:hidden safe-area-bottom ${className}`}
    >
      <div className="grid grid-cols-5 px-1">
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
              className="flex flex-col items-center justify-center py-1.5 text-gray-400 hover:text-white"
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
