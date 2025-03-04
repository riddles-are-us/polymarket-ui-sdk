import React from "react";
import { TradingPanelUI } from "./TradingPanel.ui";
import { useTradingPanel } from "./TradingPanel.script";

export interface TradingPanelWidgetProps {
  currentPrice: number;
  maxAmount?: number;
  isMobileView?: boolean;
}

export const TradingPanelWidget: React.FC<TradingPanelWidgetProps> = ({
  currentPrice,
  maxAmount,
  isMobileView = false,
}) => {
  const tradingPanelProps = useTradingPanel(currentPrice, maxAmount);
  return <TradingPanelUI {...tradingPanelProps} isMobileView={isMobileView} />;
};
