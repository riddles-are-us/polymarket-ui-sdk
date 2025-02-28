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
  priceUnit = "$",
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
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => onTabChange("buy")}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedTab === "buy"
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => onTabChange("sell")}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedTab === "sell"
                ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Sell
          </button>
        </div>
        <div className="text-gray-900 dark:text-white font-medium">
          {currentPrice}
          {priceUnit}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     text-gray-900 dark:text-white bg-white dark:bg-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount..."
          />
        </div>

        <div className="flex space-x-2">
          {quickAmounts.map((quickAmount, index) => (
            <button
              key={index}
              onClick={() => onQuickAmountClick(quickAmount)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 
                       rounded-md text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {quickAmount}
            </button>
          ))}
        </div>

        <button
          onClick={onSubmit}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            selectedTab === "buy" ? config.buyButtonColor : config.sellButtonColor
          }`}
        >
          {selectedTab === "buy" ? config.buyButtonText : config.sellButtonText}
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{config.disclaimer}</p>
      </div>
    </div>
  );
};
