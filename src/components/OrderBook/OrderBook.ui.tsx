import React, { useState } from "react";

export interface OrderItem {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBookUIProps {
  title: string;
  className?: string;
  asks: OrderItem[];
  bids: OrderItem[];
  summary: {
    lastPrice: number;
    spread: number;
    priceDirection: "up" | "down" | "neutral";
  };
  config: {
    priceUnit: string;
    quantityLabel: string;
    totalLabel: string;
    askColor: string;
    bidColor: string;
  };
  onOrderClick: (order: OrderItem, type: "ask" | "bid") => void;
}

export const OrderBookUI: React.FC<OrderBookUIProps> = ({
  title = "Order Book",
  asks,
  bids,
  summary,
  config = {
    priceUnit: "¢",
    quantityLabel: "SHARES",
    totalLabel: "TOTAL",
    askColor: "text-orange-500",
    bidColor: "text-green-500",
  },
  onOrderClick,
  className = "",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"yes" | "no">("yes");

  const renderOrderRow = (order: OrderItem, type: "bid" | "ask") => (
    <div
      className="grid grid-cols-4 py-2 text-sm cursor-pointer transition-colors duration-150 relative"
      onClick={() => onOrderClick?.(order, type)}
    >
      <span className="text-gray-400 dark:text-gray-400">{type === "ask" ? "TRADE YES" : "TRADE NO"}</span>
      <span className={`${type === "bid" ? config.bidColor : config.askColor}`}>
        {order.price}
        {config.priceUnit}
      </span>
      <span className="text-right text-gray-800 dark:text-white">
        {order.quantity.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
      <span className="text-right text-gray-800 dark:text-white">
        ${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );

  // Define visible orders based on active tab
  const visibleAsks = asks.slice(0, 4);
  const visibleBids = bids.slice(0, 4);

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button className="text-gray-400 rounded-full bg-gray-100 dark:bg-gray-800 w-6 h-6 flex items-center justify-center text-sm">
            ?
          </button>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isCollapsed ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
            />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Tabs */}
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("yes")}
                className={`px-6 py-3 font-medium text-lg ${
                  activeTab === "yes"
                    ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Trade Yes
              </button>
              <button
                onClick={() => setActiveTab("no")}
                className={`px-6 py-3 font-medium text-lg ${
                  activeTab === "no"
                    ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Trade No
              </button>
            </div>
            <div className="flex items-center pr-4">
              <span className="text-blue-500 mr-2">Rewards</span>
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <button className="text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-4 p-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
            <div>{activeTab === "yes" ? "TRADE YES" : "TRADE NO"}</div>
            <div>PRICE</div>
            <div className="text-right">{config.quantityLabel}</div>
            <div className="text-right">{config.totalLabel}</div>
          </div>

          {/* Order Rows */}
          <div>
            {activeTab === "yes" ? (
              <>
                {/* Asks (Sell orders) */}
                <div className="space-y-0">
                  {visibleAsks.map((ask, index) => (
                    <div key={`ask-${index}`} className="relative">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-red-200/30 dark:bg-red-800/30"
                        style={{
                          width: `${(ask.total / Math.max(...asks.map((a) => a.total))) * 100}%`,
                          maxWidth: "100%",
                        }}
                      />
                      <div
                        className={index === visibleAsks.length - 1 ? "bg-red-100/50 dark:bg-red-900/50 px-3" : "px-3"}
                      >
                        {index === visibleAsks.length - 1 && (
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <span className="bg-red-100/80 dark:bg-red-900/80 text-red-500 text-xs px-2 py-1 rounded">
                              Asks
                            </span>
                          </div>
                        )}
                        {renderOrderRow(ask, "ask")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Last Price and Spread */}
                <div className="flex justify-between p-3 text-gray-500 dark:text-gray-400 border-y border-gray-200 dark:border-gray-800">
                  <div>
                    Last: {summary.lastPrice}
                    {config.priceUnit}
                  </div>
                  <div>
                    Spread: {summary.spread}
                    {config.priceUnit}
                  </div>
                </div>

                {/* Bids (Buy orders) */}
                <div className="space-y-0">
                  {visibleBids.map((bid, index) => (
                    <div key={`bid-${index}`} className="relative">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-green-200/30 dark:bg-green-800/30"
                        style={{
                          width: `${(bid.total / Math.max(...bids.map((b) => b.total))) * 100}%`,
                          maxWidth: "100%",
                        }}
                      />
                      <div className={index === 0 ? "bg-green-100/50 dark:bg-green-900/50 px-3" : "px-3"}>
                        {index === 0 && (
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <span className="bg-green-100/80 dark:bg-green-900/80 text-green-500 text-xs px-2 py-1 rounded">
                              Bids
                            </span>
                          </div>
                        )}
                        {renderOrderRow(bid, "bid")}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* For Trade No tab - bids appear at top, asks at bottom */}
                {/* Bids (Buy orders) */}
                <div className="space-y-0">
                  {visibleBids.map((bid, index) => (
                    <div key={`bid-${index}`} className="relative">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-green-200/30 dark:bg-green-800/30"
                        style={{
                          width: `${(bid.total / Math.max(...bids.map((b) => b.total))) * 100}%`,
                          maxWidth: "100%",
                        }}
                      />
                      <div
                        className={
                          index === visibleBids.length - 1 ? "bg-green-100/50 dark:bg-green-900/50 px-3" : "px-3"
                        }
                      >
                        {index === visibleBids.length - 1 && (
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <span className="bg-green-100/80 dark:bg-green-900/80 text-green-500 text-xs px-2 py-1 rounded">
                              Bids
                            </span>
                          </div>
                        )}
                        {renderOrderRow(bid, "bid")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Last Price and Spread */}
                <div className="flex justify-between p-3 text-gray-500 dark:text-gray-400 border-y border-gray-200 dark:border-gray-800">
                  <div>
                    Last: {summary.lastPrice}
                    {config.priceUnit}
                  </div>
                  <div>
                    Spread: {summary.spread}
                    {config.priceUnit}
                  </div>
                </div>

                {/* Asks (Sell orders) */}
                <div className="space-y-0">
                  {visibleAsks.map((ask, index) => (
                    <div key={`ask-${index}`} className="relative">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-red-200/30 dark:bg-red-800/30"
                        style={{
                          width: `${(ask.total / Math.max(...asks.map((a) => a.total))) * 100}%`,
                          maxWidth: "100%",
                        }}
                      />
                      <div className={index === 0 ? "bg-red-100/50 dark:bg-red-900/50 px-3" : "px-3"}>
                        {index === 0 && (
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <span className="bg-red-100/80 dark:bg-red-900/80 text-red-500 text-xs px-2 py-1 rounded">
                              Asks
                            </span>
                          </div>
                        )}
                        {renderOrderRow(ask, "ask")}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
