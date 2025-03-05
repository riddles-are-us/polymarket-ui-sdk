import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

export interface TradingPanelUIProps {
  currentPrice: number;
  selectedTab: "buy" | "sell";
  selectedOption: "yes" | "no";
  tradeType: "market" | "limit";
  limitPrice: string;
  amount: string;
  maxAmount: number;
  isDropdownOpen: boolean;
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
  onTradeTypeChange: (type: "market" | "limit") => void;
  onLimitPriceChange: (price: string) => void;
  setIsDropdownOpen: (isOpen: boolean) => void;
  onAmountChange: (amount: string) => void;
  onQuickAmountClick: (amount: number) => void;
  onSubmit: () => void;
  className?: string;
  isMoreMenuOpen: boolean;
  setIsMoreMenuOpen: (isOpen: boolean) => void;
  isMobileView?: boolean;
}

export const TradingPanelUI: React.FC<TradingPanelUIProps> = ({
  currentPrice,
  selectedTab,
  selectedOption,
  tradeType,
  limitPrice,
  amount,
  maxAmount,
  isDropdownOpen,
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
  onTradeTypeChange,
  onLimitPriceChange,
  setIsDropdownOpen,
  onAmountChange,
  onQuickAmountClick,
  onSubmit,
  className = "",
  isMoreMenuOpen,
  setIsMoreMenuOpen,
  isMobileView = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const yesPrice = `${currentPrice}$`;
  const noPrice = `${100 - currentPrice}$`;

  useEffect(() => {
    if (isExpanded && isMobileView) {
      setIsPanelVisible(true);
    } else if (!isExpanded && isMobileView) {
      // 延迟隐藏面板，等待动画完成
      const timer = setTimeout(() => {
        setIsPanelVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isMobileView]);

  if (isMobileView && !isExpanded) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-2 z-50 mb-[60px]">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onOptionChange("yes");
              setIsExpanded(true);
            }}
            className="p-2 rounded-lg bg-green-500 text-white"
          >
            <div className="flex flex-col items-center">
              <span className="text-base font-medium">Buy Yes</span>
              <span className="text-xs">{yesPrice}</span>
            </div>
          </button>
          <button
            onClick={() => {
              onOptionChange("no");
              setIsExpanded(true);
            }}
            className="p-2 rounded-lg bg-red-500 text-white"
          >
            <div className="flex flex-col items-center">
              <span className="text-base font-medium">Buy No</span>
              <span className="text-xs">{noPrice}</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const mainPanel = (
    <div
      className={`bg-white dark:bg-gray-800 rounded-t-lg shadow-lg ${
        isMobileView
          ? "w-full fixed bottom-0 left-0 right-0 z-50 p-3 max-h-[90vh] overflow-y-auto transition-transform duration-10000 ease-in-out " +
            (isPanelVisible ? "transform translate-y-0" : "transform translate-y-full")
          : "w-[320px] p-6 rounded-lg"
      } ${className}`}
    >
      {isMobileView && (
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
      <div className="flex items-center justify-between mb-4 mt-6">
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
        <div className="relative">
          <div className="flex items-center">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm text-gray-900 dark:text-white flex items-center gap-1"
            >
              {tradeType === "market" ? "Market" : "Limit"}
              <ChevronDownIcon
                className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-1 py-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
              onMouseLeave={() => {
                setIsDropdownOpen(false);
                setIsMoreMenuOpen(false);
              }}
            >
              <button
                onClick={() => {
                  onTradeTypeChange("market");
                  setIsDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-1 text-sm ${
                  tradeType === "market"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Market
              </button>
              <button
                onClick={() => {
                  onTradeTypeChange("limit");
                  setIsDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-1 text-sm ${
                  tradeType === "limit"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Limit
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <div className="relative">
                <button
                  onMouseEnter={() => setIsMoreMenuOpen(true)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                >
                  More
                  <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                </button>

                {isMoreMenuOpen && (
                  <div
                    className="absolute left-full top-0 mt-0 ml-0 py-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
                    onMouseLeave={() => setIsMoreMenuOpen(false)}
                  >
                    <button
                      onClick={() => console.log("Merge clicked")}
                      className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Merge
                    </button>
                    <button
                      onClick={() => console.log("Split clicked")}
                      className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Split
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => onOptionChange("yes")}
          className={`p-4 rounded-lg flex items-center justify-center ${
            selectedOption === "yes"
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">Yes</span>
            <span className="text-lg">{yesPrice}</span>
          </div>
        </button>
        <button
          onClick={() => onOptionChange("no")}
          className={`p-4 rounded-lg flex items-center justify-center ${
            selectedOption === "no"
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">No</span>
            <span className="text-lg">{noPrice}</span>
          </div>
        </button>
      </div>

      {tradeType === "limit" && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-[80px]">Limit Price</label>
            <div className="flex items-center w-[180px]">
              <button
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600"
                onClick={() => onLimitPriceChange((Number(limitPrice) - 1).toString())}
              >
                -
              </button>
              <input
                type="text"
                value={limitPrice}
                onChange={(e) => onLimitPriceChange(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600
                         text-gray-900 dark:text-white bg-white dark:bg-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600"
                onClick={() => onLimitPriceChange((Number(limitPrice) + 1).toString())}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-[80px]">
            {tradeType === "market" ? (selectedTab === "buy" ? "Amount" : "Shares") : "Shares"}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-[180px] px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md 
                     text-gray-900 dark:text-white bg-white dark:bg-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount..."
          />
        </div>

        <div className="flex justify-end space-x-2 ">
          {tradeType === "limit" && selectedTab === "buy"
            ? ["-10", "+10"].map((adjustment, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const value = parseInt(adjustment);
                    onQuickAmountClick(value);
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 
                         rounded-md text-gray-700 dark:text-gray-300 
                         hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {adjustment}
                </button>
              ))
            : selectedTab === "sell"
            ? ["25%", "50%", "Max"].map((percentage, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (percentage === "Max") {
                      onQuickAmountClick(maxAmount);
                    } else {
                      const percent = parseInt(percentage) / 100;
                      onQuickAmountClick(Math.floor(maxAmount * percent));
                    }
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 
                         rounded-md text-gray-700 dark:text-gray-300 
                         hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {percentage}
                </button>
              ))
            : quickAmounts.map((quickAmount, index) => (
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
                  {quickAmount === "Max" ? "Max" : `+${priceUnit}${quickAmount}`}
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

  if (isMobileView && isExpanded) {
    return <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-end">{mainPanel}</div>;
  }

  return mainPanel;
};
