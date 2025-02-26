import React from "react";

export interface TradingPanelUIProps {
  currentPrice: number;
  selectedTab: "buy" | "sell";
  amount: string;
  maxAmount: number;
  priceUnit?: string;
  quickAmounts?: Array<number | "Max">;
  config?: {
    buyButtonText?: string;
    sellButtonText?: string;
    buyButtonColor?: string;
    sellButtonColor?: string;
    disclaimer?: string;
  };
  onTabChange: (tab: "buy" | "sell") => void;
  onAmountChange: (amount: string) => void;
  onQuickAmountClick: (amount: number) => void;
  onSubmit: () => void;
  className?: string;
}

export const TradingPanelUI: React.FC<TradingPanelUIProps> = ({
  currentPrice,
  selectedTab,
  amount,
  maxAmount,
  priceUnit = "¢",
  quickAmounts = [1, 20, 100, "Max"],
  config = {
    buyButtonText: "Buy Yes",
    sellButtonText: "Buy No",
    buyButtonColor: "bg-green-600 hover:bg-green-700",
    sellButtonColor: "bg-red-600 hover:bg-red-700",
    disclaimer: "By trading, you agree to the Terms of Use",
  },
  onTabChange,
  onAmountChange,
  onQuickAmountClick,
  onSubmit,
  className = "",
}) => {
  return (
    <div className={`bg-gray-900 p-6 rounded-lg ${className}`}>
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-center rounded-l ${
            selectedTab === "buy" ? config.buyButtonColor : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
          onClick={() => onTabChange("buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-r ${
            selectedTab === "sell" ? config.sellButtonColor : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
          onClick={() => onTabChange("sell")}
        >
          Sell
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2">Amount</label>
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
          <span className="absolute right-3 top-2 text-gray-400">$</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {quickAmounts.map((value, index) => (
          <button
            key={index}
            onClick={() => onQuickAmountClick(value === "Max" ? maxAmount : (value as number))}
            className="bg-gray-800 text-gray-400 px-2 py-1 rounded hover:bg-gray-700 hover:text-white"
          >
            {typeof value === "number" ? `$${value}` : value}
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Price</span>
          <span className="text-white">
            {currentPrice}
            {priceUnit}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Cost</span>
          <span className="text-white">${((parseFloat(amount || "0") * currentPrice) / 100).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className={`w-full py-3 rounded font-medium ${
          selectedTab === "buy" ? config.buyButtonColor : config.sellButtonColor
        } text-white`}
      >
        {selectedTab === "buy" ? config.buyButtonText : config.sellButtonText}
      </button>

      {config.disclaimer && <p className="text-center text-gray-500 text-sm mt-4">{config.disclaimer}</p>}
    </div>
  );
};
