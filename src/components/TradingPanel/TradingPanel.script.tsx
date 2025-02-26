import { useState, useCallback } from "react";

export const useTradingPanel = (initialPrice: number = 75, initialMaxAmount: number = 1000) => {
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("0");

  const handleTabChange = useCallback((tab: "buy" | "sell") => {
    setSelectedTab(tab);
  }, []);

  const handleAmountChange = useCallback((value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }, []);

  const handleQuickAmountClick = useCallback((value: number) => {
    setAmount(value.toString());
  }, []);

  const handleSubmit = useCallback(() => {
    console.log(`${selectedTab} order submitted:`, {
      amount: parseFloat(amount),
      price: initialPrice,
      total: (parseFloat(amount || "0") * initialPrice) / 100,
    });
    // Implement order submission logic
  }, [amount, selectedTab, initialPrice]);

  return {
    currentPrice: initialPrice,
    selectedTab,
    amount,
    maxAmount: initialMaxAmount,
    onTabChange: handleTabChange,
    onAmountChange: handleAmountChange,
    onQuickAmountClick: handleQuickAmountClick,
    onSubmit: handleSubmit,
  };
};
