import React from "react";
import { OrderBookUI } from "./OrderBook.ui";
import { useOrderBook } from "./OrderBook.script";

export const OrderBookWidget: React.FC<{ className?: string }> = ({ className = "" }) => {
  const orderBookProps = useOrderBook();
  return <OrderBookUI {...orderBookProps} title="Order Book" className={className} />;
};
