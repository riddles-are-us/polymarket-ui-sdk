import { useState, useCallback } from "react";

export const useTradingPanel = (initialPrice: number = 75, initialMaxAmount: number = 1000) => {
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");
  const [selectedOption, setSelectedOption] = useState<"yes" | "no">("yes");
  const [tradeType, setTradeType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState<string>(initialPrice.toString());
  const [amount, setAmount] = useState<string>("0");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleTabChange = useCallback((tab: "buy" | "sell") => {
    setSelectedTab(tab);
  }, []);

  const handleOptionChange = useCallback((option: "yes" | "no") => {
    setSelectedOption(option);
  }, []);

  const handleTradeTypeChange = useCallback((type: "market" | "limit") => {
    setTradeType(type);
    setIsDropdownOpen(false);
  }, []);

  const handleLimitPriceChange = useCallback((value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setLimitPrice(value);
    }
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
    selectedOption,
    tradeType,
    limitPrice,
    amount,
    maxAmount: initialMaxAmount,
    isDropdownOpen,
    isMoreMenuOpen,
    onTabChange: handleTabChange,
    onOptionChange: handleOptionChange,
    onTradeTypeChange: handleTradeTypeChange,
    onLimitPriceChange: handleLimitPriceChange,
    setIsDropdownOpen,
    onAmountChange: handleAmountChange,
    onQuickAmountClick: handleQuickAmountClick,
    onSubmit: handleSubmit,
    setIsMoreMenuOpen,
  };
};
