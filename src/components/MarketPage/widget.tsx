import React from "react";
import { MarketPageUI } from "./MarketPage.ui";

export interface MarketPageWidgetProps {
  marketId: string;
  className?: string;
}

export const MarketPageWidget: React.FC = () => {
  return <MarketPageUI className="" />;
};
