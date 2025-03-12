import React from "react";
import { OrderBookUI } from "./OrderBook.ui";
import { useOrderBook, OrderBookData } from "../../hooks/useOrderBook";
export type { OrderBookData } from "../../hooks/useOrderBook";

/**
 * Props for the OrderBook
 */
export interface OrderBookProps {
  /** Title of the order book */
  title?: string;
  /** Order book data with asks, bids and lastPrice
   * eg:
   * {
   *   asks: [{price: 100, quantity: 100, total: 10000}],
   *   bids: [{price: 100, quantity: 100, total: 10000}],
   *   lastPrice: 100,
   * }
   */
  orders: OrderBookData;
  /** Maximum number of rows to display per side */
  maxRows?: number;
  /** Price symbol (e.g., "¢" or "$") */
  priceSymbol?: string;
  /** Maximum visible height (px or CSS value) */
  maxHeight?: string;
  /** Custom width (px or CSS value) */
  width?: string;
  /** Show rewards section */
  showRewards?: boolean;
  /** ReactNode for rewards tooltip explanation */
  rewardsTooltip?: React.ReactNode;
  /** Function to call when refresh button is clicked */
  onRefresh?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * OrderBook component for displaying and interacting with market order books
 */
export const OrderBook: React.FC<OrderBookProps> = ({
  title,
  orders,
  maxRows = 5,
  priceSymbol = "¢",
  maxHeight = "500px",
  width,
  showRewards = false,
  rewardsTooltip,
  onRefresh,
  className,
}) => {
  // Use the hook to manage order book state
  const { activeTab, onTabChange, asks, bids, lastPrice, spread } = useOrderBook({
    orders,
    maxRows,
  });

  return (
    <OrderBookUI
      title={title}
      asks={asks}
      bids={bids}
      lastPrice={lastPrice}
      spread={spread}
      activeTab={activeTab}
      onTabChange={onTabChange}
      priceSymbol={priceSymbol}
      maxHeight={maxHeight}
      width={width}
      showRewards={showRewards}
      rewardsTooltip={rewardsTooltip}
      className={className}
      onRefresh={onRefresh}
    />
  );
};

export { OrderBookUI } from "./OrderBook.ui";
export type { OrderBookUIProps } from "./OrderBook.ui";
