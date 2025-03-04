import React from "react";

export interface TradingPanelUIProps {
  currentPrice: number;
  selectedTab: "buy" | "sell";
  selectedOption: "yes" | "no";
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
  onOptionChange: (option: "yes" | "no") => void;
  onAmountChange: (amount: string) => void;
  onQuickAmountClick: (amount: number) => void;
  onSubmit: () => void;
  className?: string;
}

export const TradingPanelUI: React.FC<TradingPanelUIProps> = ({
  currentPrice,
  selectedTab,
  selectedOption,
  amount,
  maxAmount,
  priceUnit = "$",
  quickAmounts = [1, 20, 100, "Max"],
  config = {
    buyButtonText: "Buy Yes",
    sellButtonText: "Sell No",
    buyButtonColor: "bg-green-600 hover:bg-green-700",
    sellButtonColor: "bg-red-600 hover:bg-red-700",
    disclaimer: "By trading, you agree to the Terms of Use",
  },
  onTabChange,
  onOptionChange,
  onAmountChange,
  onQuickAmountClick,
  onSubmit,
  className = "",
}) => {
  const yesPrice = `${currentPrice}$`;
  const noPrice = `${100 - currentPrice}$`;

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => onTabChange("buy")}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedTab === "buy"
                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => onTabChange("sell")}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedTab === "sell"
                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Sell
          </button>
        </div>
        <div className="text-sm text-gray-500">Market ▼</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => onOptionChange("yes")}
          className={`p-4 rounded-lg flex flex-col items-center justify-center ${
            selectedOption === "yes"
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <span className="text-lg font-medium">Yes</span>
          <span className="text-sm">{yesPrice}</span>
        </button>
        <button
          onClick={() => onOptionChange("no")}
          className={`p-4 rounded-lg flex flex-col items-center justify-center ${
            selectedOption === "no"
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <span className="text-lg font-medium">No</span>
          <span className="text-sm">{noPrice}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {selectedTab === "buy" ? "Amount" : "Shares"}
          </label>
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
              onClick={() => {
                if (quickAmount === "Max") {
                  onQuickAmountClick(maxAmount);
                } else {
                  onQuickAmountClick(Number(quickAmount));
                }
              }}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 
                       rounded-md text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {typeof quickAmount === "number" ? `+$${quickAmount}` : quickAmount}
            </button>
          ))}
        </div>

        <button
          onClick={onSubmit}
          className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
        >
          {`${selectedTab === "buy" ? "Buy" : "Sell"} ${selectedOption === "yes" ? "Yes" : "No"}`}
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{config.disclaimer}</p>
      </div>
    </div>
  );
};
