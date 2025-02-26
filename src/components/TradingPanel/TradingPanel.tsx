import React, { useState } from "react";

export interface TradingPanelProps {
  currentPrice: number;
  onTrade: (type: "buy" | "sell", amount: number) => void;
  maxAmount?: number;
}

export const TradingPanel: React.FC<TradingPanelProps> = ({ currentPrice, onTrade, maxAmount = 100 }) => {
  const [amount, setAmount] = useState<string>("0");
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");

  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-center rounded-l ${
            selectedTab === "buy" ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
          onClick={() => setSelectedTab("buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-r ${
            selectedTab === "sell" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
          onClick={() => setSelectedTab("sell")}
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
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
          <span className="absolute right-3 top-2 text-gray-400">$</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {[1, 20, 100, "Max"].map((value) => (
          <button
            key={value}
            onClick={() => handleQuickAmount(value === "Max" ? maxAmount : (value as number))}
            className="bg-gray-800 text-gray-400 px-2 py-1 rounded hover:bg-gray-700 hover:text-white"
          >
            {typeof value === "number" ? `$${value}` : value}
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Price</span>
          <span className="text-white">{currentPrice}¢</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Cost</span>
          <span className="text-white">${((parseFloat(amount || "0") * currentPrice) / 100).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => onTrade(selectedTab, parseFloat(amount))}
        className={`w-full py-3 rounded font-medium ${
          selectedTab === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
        } text-white`}
      >
        {selectedTab === "buy" ? "Buy Yes" : "Buy No"}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">By trading, you agree to the Terms of Use</p>
    </div>
  );
};
