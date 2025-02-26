import React from "react";
import { MarketPageUI } from "./MarketPage.ui";
import { useMarketPage } from "./MarketPage.script";

export interface MarketPageWidgetProps {
  marketId: string;
}

export const MarketPageWidget: React.FC<MarketPageWidgetProps> = ({ marketId }) => {
  const { marketData, isLoading, error } = useMarketPage(marketId);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!marketData) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Market not found</div>;
  }

  return <MarketPageUI marketId={marketId} />;
};
