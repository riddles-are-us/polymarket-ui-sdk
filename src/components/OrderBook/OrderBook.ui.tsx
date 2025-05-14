import React, { useState } from "react";
import { OrderItem, OrderBookTab } from "../../hooks/useOrderBook";

/**
 * Props for OrderBookUI component
 */
export interface OrderBookUIProps {
  /** Title of the order book */
  title?: string;
  /** Ask (sell) orders */
  asks: OrderItem[];
  /** Bid (buy) orders */
  bids: OrderItem[];
  /** Last price */
  lastPrice?: number;
  /** Price spread */
  spread: number;
  /** Currently active tab */
  activeTab: OrderBookTab;
  /** Callback for tab change */
  onTabChange: (tab: OrderBookTab) => void;
  /** Price symbol (e.g., "$", "¢") */
  priceSymbol?: string;
  /** Maximum visible height (px or CSS value) */
  maxHeight?: string;
  /** Custom width (px or CSS value) */
  width?: string;
  /** Additional CSS class name */
  className?: string;
  /** Show rewards section */
  showRewards?: boolean;
  /** ReactNode for rewards tooltip explanation */
  rewardsTooltip?: React.ReactNode;
  /** Callback for refresh button */
  onRefresh?: () => void;
}

/**
 * Order book UI component
 */
export const OrderBookUI: React.FC<OrderBookUIProps> = ({
  title = "Order Book",
  asks,
  bids,
  lastPrice,
  spread,
  activeTab,
  onTabChange,
  priceSymbol = "¢",
  maxHeight,
  width,
  className = "",
  showRewards = false,
  rewardsTooltip,
  onRefresh,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}${priceSymbol}`;
  };

  const formatQuantity = (quantity: number) => {
    return quantity.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatTotal = (total: number) => {
    return `$${total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const calculateVolumeWidth = (order: OrderItem, items: OrderItem[]) => {
    const maxTotal = Math.max(...items.map((item) => item.total));
    return maxTotal > 0 ? `${(order.total / maxTotal) * 100}%` : "0%";
  };

  // Determine font sizes based on component width
  const getResponsiveSizes = () => {
    const sizes = {
      title: "text-base",
      header: "text-sm",
      content: "text-xs",
    };

    if (!width) return sizes;

    const numericWidth = parseInt(width.replace(/[^0-9]/g, ""));

    if (numericWidth < 400) {
      sizes.title = "text-sm";
      sizes.header = "text-xs";
      sizes.content = "text-xs";
    } else if (numericWidth >= 600) {
      sizes.title = "text-lg";
      sizes.header = "text-base";
      sizes.content = "text-sm";
    }

    return sizes;
  };

  const fontSizes = getResponsiveSizes();

  const renderOrderRow = (order: OrderItem, type: "ask" | "bid", items: OrderItem[]) => (
    <div
      key={`${type}-${order.price}`}
      className={`relative grid grid-cols-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${fontSizes.content} text-gray-800 dark:text-gray-200`}
      style={{ gridTemplateColumns: "1fr 0.8fr 1fr 1.2fr" }}
    >
      <div
        className={`absolute top-0 bottom-0 left-0 ${
          type === "ask" ? "bg-red-600/30 dark:bg-red-900/40" : "bg-green-600/30 dark:bg-green-800/40"
        }`}
        style={{
          width: calculateVolumeWidth(order, items),
          zIndex: 1,
        }}
      />
      <div className="z-10 pl-2">{type === "ask" ? "TRADE YES" : "TRADE NO"}</div>
      <div
        className={`z-10 text-right ${
          type === "ask" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
        }`}
      >
        {formatPrice(order.price)}
      </div>
      <div className="z-10 text-right pr-3">{formatQuantity(order.quantity)}</div>
      <div className="z-10 text-right pr-2">{formatTotal(order.total)}</div>
    </div>
  );

  const containerStyles = {
    width: width || "100%",
    maxHeight: collapsed ? "auto" : maxHeight,
  };

  const reversedBids = [...bids].reverse();
  const reversedAsks = [...asks].reverse();

  return (
    <div
      className={`bg-white dark:bg-[#1a2233] rounded-lg shadow-md overflow-hidden ${className}`}
      style={containerStyles}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <h3 className={`${fontSizes.title || "text-base"} font-medium text-gray-700 dark:text-gray-300`}>{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {showRewards && (
            <div className="flex items-center mr-2 group relative">
              <span className={`text-blue-600 dark:text-blue-400 ${fontSizes.content || "text-sm"} mr-1`}>Rewards</span>
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {rewardsTooltip && (
                <div
                  className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-xs rounded p-2 shadow-lg 
                  w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                >
                  {rewardsTooltip}
                </div>
              )}
            </div>
          )}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div>
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                className={`px-4 py-3 ${fontSizes.header || "text-base"} font-medium ${
                  activeTab === "yes"
                    ? "text-gray-900 dark:text-white border-b-2 border-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => onTabChange("yes")}
              >
                Trade Yes
              </button>
              <button
                className={`px-4 py-3 ${fontSizes.header || "text-base"} font-medium ${
                  activeTab === "no"
                    ? "text-gray-900 dark:text-white border-b-2 border-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => onTabChange("no")}
              >
                Trade No
              </button>
            </div>
            {showRewards && (
              <div className="px-3">
                <button className="text-gray-500 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Table Header */}
          <div
            className={`grid grid-cols-4 py-2 ${fontSizes.content} text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 px-3 font-semibold`}
            style={{ gridTemplateColumns: "1fr 0.8fr 1fr 1.2fr" }}
          >
            <div>{activeTab === "yes" ? "TRADE YES" : "TRADE NO"}</div>
            <div className="text-right">PRICE</div>
            <div className="text-right pr-3">SHARES</div>
            <div className="text-right pr-2">TOTAL</div>
          </div>

          {/* Order Book Content - Scrollable area */}
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: maxHeight ? `calc(${maxHeight} - 150px)` : "300px",
            }}
          >
            {activeTab === "yes" ? (
              <>
              {/* Asks Section with Label */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className={`px-2 py-1 bg-red-500/10 dark:bg-red-900/30 ${fontSizes.content} flex items-center`}>
                  <div className="bg-red-500 w-4 h-4 flex items-center justify-center text-white rounded-sm mr-1">A</div>
                  <span className="text-gray-600 dark:text-gray-300">Asks</span>
                </div>
                <div>{asks.map((ask) => renderOrderRow(ask, "ask", asks))}</div>
              </div>

              {/* Last Price & Spread */}
              {lastPrice && (
                <div
                  className={`flex justify-between ${fontSizes.content} p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800`}
                >
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Last:</span>{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(lastPrice)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Spread:</span>{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(spread)}</span>
                  </div>
                </div>
              )}

              {/* Bids Section with Label */}
              <div>
                <div className={`px-2 py-1 bg-green-500/10 dark:bg-green-900/30 ${fontSizes.content} flex items-center`}>
                  <div className="bg-green-500 w-4 h-4 flex items-center justify-center text-white rounded-sm mr-1">
                    B
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">Bids</span>
                </div>
                <div>{bids.map((bid) => renderOrderRow(bid, "bid", bids))}</div>
              </div>
              </>
            ) : (
              <>
              {/* For Trade No tab - bids appear at top, asks at bottom */}
              {/* Bids Section with Label */}
              <div>
                <div className={`px-2 py-1 bg-green-500/10 dark:bg-green-900/30 ${fontSizes.content} flex items-center`}>
                  <div className="bg-green-500 w-4 h-4 flex items-center justify-center text-white rounded-sm mr-1">
                    B
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">Bids</span>
                </div>
                <div>{reversedBids.map((bid) => renderOrderRow(bid, "bid", reversedBids))}</div>
              </div>

              {/* Last Price & Spread */}
              {lastPrice && (
                <div
                  className={`flex justify-between ${fontSizes.content} p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800`}
                >
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Last:</span>{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(lastPrice)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Spread:</span>{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(spread)}</span>
                  </div>
                </div>
              )}

              {/* Asks Section with Label */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className={`px-2 py-1 bg-red-500/10 dark:bg-red-900/30 ${fontSizes.content} flex items-center`}>
                  <div className="bg-red-500 w-4 h-4 flex items-center justify-center text-white rounded-sm mr-1">A</div>
                  <span className="text-gray-600 dark:text-gray-300">Asks</span>
                </div>
                <div>{reversedAsks.map((ask) => renderOrderRow(ask, "ask", reversedAsks))}</div>
              </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
