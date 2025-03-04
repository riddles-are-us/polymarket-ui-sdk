import React from "react";
import { MarketPageUI } from "./MarketPage.ui";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export interface MarketPageWidgetProps {
  marketId: string;
  className?: string;
}

export const MarketPageWidget: React.FC<MarketPageWidgetProps> = ({ marketId, className }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return <MarketPageUI marketId={marketId} className={className} />;
};
