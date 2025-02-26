import React from "react";

export interface Order {
  price: number;
  shares: number;
  total: number;
}

export interface OrderBookProps {
  asks: Order[];
  bids: Order[];
  lastPrice: number;
  spread: number;
  onOrderClick?: (order: Order, type: "ask" | "bid") => void;
}

export const OrderBook: React.FC<OrderBookProps> = ({ asks, bids, lastPrice, spread, onOrderClick }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Order Book</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Last:</span>
          <span className="text-white">{lastPrice}¢</span>
          <span className="text-gray-400 ml-4">Spread:</span>
          <span className="text-white">{spread}¢</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-2">
          <div>Price</div>
          <div className="text-right">Shares</div>
          <div className="text-right">Total</div>
        </div>

        {/* Asks (Sell orders) */}
        <div className="space-y-1">
          {asks.map((ask, index) => (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-3 gap-4 text-sm hover:bg-gray-800 cursor-pointer p-1 rounded"
              onClick={() => onOrderClick?.(ask, "ask")}
            >
              <div className="text-red-500">{ask.price}¢</div>
              <div className="text-right text-white">{ask.shares.toLocaleString()}</div>
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
              <div className="text-green-500">{bid.price}¢</div>
              <div className="text-right text-white">{bid.shares.toLocaleString()}</div>
              <div className="text-right text-gray-400">${bid.total.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Last: {lastPrice}¢</span>
        <span className="text-gray-400">Spread: {spread}¢</span>
      </div>
    </div>
  );
};
