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
    priceUnit: "¢",
    quantityLabel: "Shares",
    totalLabel: "Total",
    askColor: "text-red-500",
    bidColor: "text-green-500",
  },
  onOrderClick,
  className = "",
}) => {
  return (
    <div className={`bg-gray-900 p-6 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Last:</span>
          <span className="text-white">
            {summary.lastPrice}
            {config.priceUnit}
          </span>
          <span className="text-gray-400 ml-4">Spread:</span>
          <span className="text-white">
            {summary.spread}
            {config.priceUnit}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-2">
          <div>Price</div>
          <div className="text-right">{config.quantityLabel}</div>
          <div className="text-right">{config.totalLabel}</div>
        </div>

        {/* Asks (Sell orders) */}
        <div className="space-y-1">
          {asks.map((ask, index) => (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-3 gap-4 text-sm hover:bg-gray-800 cursor-pointer p-1 rounded"
              onClick={() => onOrderClick?.(ask, "ask")}
            >
              <div className={config.askColor}>
                {ask.price}
                {config.priceUnit}
              </div>
              <div className="text-right text-white">{ask.quantity.toLocaleString()}</div>
              <div className="text-right text-gray-400">${ask.total.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 my-4" />

        {/* Bids (Buy orders) */}
        <div className="space-y-1">
          {bids.map((bid, index) => (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-3 gap-4 text-sm hover:bg-gray-800 cursor-pointer p-1 rounded"
              onClick={() => onOrderClick?.(bid, "bid")}
            >
              <div className={config.bidColor}>
                {bid.price}
                {config.priceUnit}
              </div>
              <div className="text-right text-white">{bid.quantity.toLocaleString()}</div>
              <div className="text-right text-gray-400">${bid.total.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">
          Last: {summary.lastPrice}
          {config.priceUnit}
        </span>
        <span className="text-gray-400">
          Spread: {summary.spread}
          {config.priceUnit}
        </span>
      </div>
    </div>
  );
};
