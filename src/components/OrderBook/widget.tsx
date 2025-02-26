import React from "react";
import { OrderBookUI } from "./OrderBook.ui";
import { useOrderBook } from "./OrderBook.script";

export const OrderBookWidget: React.FC = () => {
  const orderBookProps = useOrderBook();
  return <OrderBookUI {...orderBookProps} />;
};
