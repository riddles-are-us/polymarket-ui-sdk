import React from "react";

export interface OrderItem {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBookUIProps {
  title?: string;
  asks: OrderItem[];
  bids: OrderItem[];
  summary: {
    lastPrice: number;
    spread: number;
    priceDirection: "up" | "down" | "neutral";
  };
  config?: {
    priceUnit?: string;
    quantityLabel?: string;
    totalLabel?: string;
    askColor?: string;
    bidColor?: string;
  };
  onOrderClick?: (order: OrderItem, type: "ask" | "bid") => void;
  className?: string;
}

export const OrderBookUI: React.FC<OrderBookUIProps> = ({
  title = "Order Book",
  asks,
  bids,
  summary,
  config = {
    priceUnit: "$",
    quantityLabel: "",
    totalLabel: "Total",
    askColor: "text-red-500",
    bidColor: "text-green-500",
  },
  onOrderClick,
  className = "",
}) => {
  const renderOrderRow = (order: OrderItem, type: "bid" | "ask") => (
    <div 
      className="grid grid-cols-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
      onClick={() => onOrderClick?.(order, type)}
    >
      <span className={`${type === "bid" ? config.bidColor : config.askColor}`}>
        {order.price.toFixed(2)}
        {config.priceUnit}
      </span>
      <span className="text-gray-400 dark:text-gray-500 text-right">{order.quantity.toLocaleString()}</span>
      <span className="text-gray-400 dark:text-gray-500 text-right">{order.total.toLocaleString()}</span>
    </div>
  );

  // Set color and arrow based on price direction
  const priceDirectionColor = 
    summary.priceDirection === "up" 
      ? config.bidColor 
      : summary.priceDirection === "down" 
        ? config.askColor 
        : "text-gray-500";
  
  const priceDirectionArrow = 
    summary.priceDirection === "up" 
      ? "↑" 
      : summary.priceDirection === "down" 
        ? "↓" 
        : "→";

  return (
    <div className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm w-full max-w-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">Last:</span>
          <span className={`${priceDirectionColor} flex items-center`}>
            {summary.lastPrice.toFixed(2)}
            {config.priceUnit}
            <span className="ml-1 font-bold">{priceDirectionArrow}</span>
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-4">Spread:</span>
          <span className="text-gray-900 dark:text-white">
            {summary.spread.toFixed(2)}
            {config.priceUnit}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <div>Price</div>
          <div className="text-right">{config.quantityLabel}</div>
          <div className="text-right">{config.totalLabel}</div>
        </div>

        {/* Asks (Sell orders) - displayed in descending price order */}
        <div className="space-y-1 h-[250px] overflow-y-auto">
          {[...asks].reverse().map((ask, index) => (
            <div key={`ask-${index}`} className="relative">
              <div
                className="absolute right-0 top-0 bottom-0 bg-red-500/10 dark:bg-red-500/5"
                style={{ 
                  width: `${(ask.total / Math.max(...asks.map((a) => a.total))) * 100}%`,
                  maxWidth: "100%" 
                }}
              />
              {renderOrderRow(ask, "ask")}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 my-4" />

        {/* Bids (Buy orders) */}
        <div className="space-y-1 h-[250px] overflow-y-auto">
          {bids.map((bid, index) => (
            <div key={`bid-${index}`} className="relative">
              <div
                className="absolute right-0 top-0 bottom-0 bg-green-500/10 dark:bg-green-500/5"
                style={{ 
                  width: `${(bid.total / Math.max(...bids.map((b) => b.total))) * 100}%`,
                  maxWidth: "100%" 
                }}
              />
              {renderOrderRow(bid, "bid")}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className={`${priceDirectionColor} flex items-center`}>
          Last: {summary.lastPrice.toFixed(2)}
          {config.priceUnit}
          <span className="ml-1 font-bold">{priceDirectionArrow}</span>
        </span>
        <span className="text-gray-400">
          Spread: {summary.spread.toFixed(2)}
          {config.priceUnit}
        </span>
      </div>
    </div>
  );
};
