import { useState, useCallback, useMemo } from "react";

/**
 * Order item structure
 */
export interface OrderItem {
  /** Price of the order */
  price: number;
  /** Quantity (volume) of the order */
  quantity: number;
  /** Total value (price * quantity) */
  total: number;
}

/**
 * Order book data structure
 */
export interface OrderBookData {
  /** Ask (sell) orders */
  asks: OrderItem[];
  /** Bid (buy) orders */
  bids: OrderItem[];
  /** Last price */
  lastPrice?: number;
}

/**
 * Order book tab type
 */
export type OrderBookTab = "yes" | "no";

/**
 * Order book hook properties
 */
export interface UseOrderBookProps {
  /** Order book data */
  orders: OrderBookData;
  /** Maximum number of rows to display per side */
  maxRows?: number;
}

/**
 * Hook for managing order book state and functionality
 */
export const useOrderBook = ({ orders, maxRows = 4 }: UseOrderBookProps) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<OrderBookTab>("yes");

  // Calculate spread
  const spread = useMemo(() => {
    if (orders.asks.length === 0 || orders.bids.length === 0) return 0;
    const lowestAsk = Math.min(...orders.asks.map((ask) => ask.price));
    const highestBid = Math.max(...orders.bids.map((bid) => bid.price));
    return lowestAsk - highestBid;
  }, [orders.asks, orders.bids]);

  // Limit the number of rows displayed
  const asks = useMemo(() => {
    return [...orders.asks].slice(0, maxRows);
  }, [orders.asks, maxRows]);

  const bids = useMemo(() => {
    return [...orders.bids].slice(0, maxRows);
  }, [orders.bids, maxRows]);

  // Handle tab change
  const onTabChange = useCallback((tab: OrderBookTab) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    onTabChange,
    asks,
    bids,
    lastPrice: orders.lastPrice,
    spread,
  };
};
