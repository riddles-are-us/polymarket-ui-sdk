import React from "react";

export interface NavBarUIProps {
  items: Array<{
    icon: React.ReactNode;
    label: string;
    href: string;
  }>;
  position?: 'top' | 'bottom';
  isSmallScreen: boolean;
  activeItem: string;
  onItemClick: (href: string) => void;
}

export const NavBarUI: React.FC<NavBarUIProps> = ({
  items,
  position,
  isSmallScreen,
  activeItem,
  onItemClick
}) => {
  const navPosition = isSmallScreen ? 'bottom' : position;
  const isBottom = navPosition === 'bottom';
  
  const iconSizes = {
    small: { width: 20, height: 20 },
    large: { width: 24, height: 24 }
  };

  return (
    <nav className={`
      fixed ${isBottom ? 'bottom-0' : 'top-0'} left-0 right-0
      bg-white shadow-lg z-50
      ${isBottom ? 'py-2' : 'py-4'}
      w-full
    `}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-row justify-around">
          {items.map((item) => {
            const isActive = activeItem === item.href;
            const iconSize = isBottom ? iconSizes.large : iconSizes.small;
            
            const modifiedIcon = React.isValidElement(item.icon) 
              ? React.cloneElement(item.icon as React.ReactElement<any>, {
                  'aria-hidden': true,
                  style: { 
                    width: `${iconSize.width}px`, 
                    height: `${iconSize.height}px`,
                    minWidth: `${iconSize.width}px`, 
                    minHeight: `${iconSize.height}px` 
                  },
                  width: iconSize.width,
                  height: iconSize.height,
                  className: undefined
                })
              : item.icon;
            
            return (
              <div 
                key={item.href} 
                className="flex-1 text-center"
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick(item.href);
                  }}
                  style={{ textDecoration: 'none' }}
                  className={`
                    block w-full [text-decoration:none!important]
                    ${isActive ? 'text-[#333333]' : 'text-[#666666]'}
                  `}
                >
                  {isBottom ? (
                    <div className={`
                      flex flex-col items-center
                      ${isActive ? 'text-[#333333]' : 'text-[#666666]'}
                    `}>
                      <div className="flex-shrink-0">
                        {modifiedIcon}
                      </div>
                      <span className="text-xs mt-1.5 whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={`
                        inline-flex flex-row items-center
                        ${isActive ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'}
                        transition-colors duration-200
                      `}
                    >
                      <div className="flex-shrink-0">
                        {modifiedIcon}
                      </div>
                      <span className="text-sm ml-2 whitespace-nowrap">
                        {item.label}
                      </span>
                    </button>
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}; 