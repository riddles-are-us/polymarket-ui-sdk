import React from "react";
import { NavbarWidget } from "../Navbar";
import { MarketChartWidget } from "../MarketChart";
import { TradingPanelWidget } from "../TradingPanel";
import { OrderBookWidget } from "../OrderBook";
import { CommentsWidget } from "../Comments";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export interface MarketPageUIProps {
  className?: string;
}

export const MarketPageUI: React.FC<MarketPageUIProps> = ({ className = "" }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${className}`}>
      <NavbarWidget />

      <div className="container mx-auto px-4 py-6 pb-[120px] lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <MarketChartWidget />
            <OrderBookWidget />
            <CommentsWidget />
          </div>

          {/* Right column - Only visible on desktop */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <TradingPanelWidget currentPrice={75} maxAmount={1000} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile trading panel */}
      {isMobile && <TradingPanelWidget currentPrice={75} maxAmount={1000} isMobileView={true} />}
    </div>
  );
};
