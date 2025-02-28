import { useCallback, useState } from "react";
import { OrderItem } from "./OrderBook.ui";

// Mock data generator
const generateMockOrders = (basePrice: number, count: number, isAsk: boolean): OrderItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const priceOffset = isAsk ? i * 0.5 : -i * 0.5;
    const price = Number((basePrice + priceOffset).toFixed(2));
    const quantity = Math.floor(Math.random() * 10000) + 1000;
    return {
      price,
      quantity,
      total: Number(((price * quantity) / 100).toFixed(2)),
    };
  });
};

export const useOrderBook = () => {
  const basePrice = 75;
  const [lastPrice] = useState(basePrice);
  const [asks] = useState(() => generateMockOrders(basePrice, 10, true));
  const [bids] = useState(() => generateMockOrders(basePrice, 10, false));

  const handleOrderClick = useCallback((order: OrderItem, type: "ask" | "bid") => {
    console.log(`${type} order clicked:`, order);
    // Implement order selection logic
  }, []);

  const spread = Number((asks[0].price - bids[0].price).toFixed(2));

  return {
    asks,
    bids,
    summary: {
      lastPrice,
      spread,
    },
    config: {
      priceUnit: "$",
      quantityLabel: "Shares",
      totalLabel: "Total",
      askColor: "text-red-500",
      bidColor: "text-green-500",
    },
    onOrderClick: handleOrderClick,
  };
};
