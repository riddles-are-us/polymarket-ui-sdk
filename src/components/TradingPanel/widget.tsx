import React from "react";
import { TradingPanelUI } from "./TradingPanel.ui";
import { useTradingPanel } from "./TradingPanel.script";

export interface TradingPanelWidgetProps {
  currentPrice: number;
  maxAmount?: number;
}

export const TradingPanelWidget: React.FC<TradingPanelWidgetProps> = ({ currentPrice, maxAmount }) => {
  const tradingPanelProps = useTradingPanel(currentPrice, maxAmount);
  return <TradingPanelUI {...tradingPanelProps} />;
};
