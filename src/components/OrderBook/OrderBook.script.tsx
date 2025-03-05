import { useCallback, useState, useEffect, useRef } from "react";
import { OrderItem } from "./OrderBook.ui";

// Mock data generator
const generateMockOrders = (basePrice: number, count: number, isAsk: boolean): OrderItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const priceOffset = isAsk ? i * 1 : -i * 1; // Use whole numbers for cents
    const price = Math.round(basePrice + priceOffset);
    const quantity = parseFloat((Math.random() * 10000 + 1000).toFixed(2));
    return {
      price,
      quantity,
      total: parseFloat(((price * quantity) / 100).toFixed(2)),
    };
  });
};

// Randomly update orders
const updateOrders = (
  orders: OrderItem[],
  basePrice: number,
  isAsk: boolean,
  fixedCount: number,
  otherSideLowestPrice?: number
): OrderItem[] => {
  // Copy the list to avoid directly modifying the state
  let updatedOrders = [...orders];

  // Randomly update the quantity of existing orders
  updatedOrders = updatedOrders.map((order) => {
    // 70% chance to update the order
    if (Math.random() < 0.7) {
      // Increase quantity variation range (-30% to +30%)
      const quantityChangePercent = Math.random() * 0.6 - 0.3;
      const newQuantity = Math.max(100, Math.floor(order.quantity * (1 + quantityChangePercent)));

      // Add price fluctuation (-0.3 to +0.3), but ensure price relationship is maintained
      let priceChange = Math.random() * 0.6 - 0.3;
      let newPrice = parseFloat((order.price + priceChange).toFixed(2));

      // Ensure ask prices are not lower than the highest bid price
      if (isAsk && otherSideLowestPrice !== undefined) {
        newPrice = parseFloat(Math.max(newPrice, otherSideLowestPrice + 0.01).toFixed(2));
      }
      // Ensure bid prices are not higher than the lowest ask price
      else if (!isAsk && otherSideLowestPrice !== undefined) {
        newPrice = parseFloat(Math.min(newPrice, otherSideLowestPrice - 0.01).toFixed(2));
      }

      return {
        ...order,
        price: newPrice,
        quantity: newQuantity,
        total: parseFloat(((newPrice * newQuantity) / 100).toFixed(2)),
      };
    }
    return order;
  });

  // Ensure order count remains fixed
  if (updatedOrders.length < fixedCount) {
    // If order count is insufficient, add new orders
    const missingCount = fixedCount - updatedOrders.length;
    for (let i = 0; i < missingCount; i++) {
      // Add new orders based on the last order's price
      const lastOrder = isAsk
        ? updatedOrders.length > 0
          ? updatedOrders[updatedOrders.length - 1]
          : null
        : updatedOrders.length > 0
        ? updatedOrders[0]
        : null;

      const newPriceOffset = isAsk ? 0.5 : -0.5;
      const newPrice = lastOrder
        ? Number((lastOrder.price + newPriceOffset).toFixed(2))
        : Number((basePrice + (isAsk ? 0.5 : -0.5)).toFixed(2));

      const newQuantity = Math.floor(Math.random() * 10000) + 1000;

      const newOrder = {
        price: newPrice,
        quantity: newQuantity,
        total: Number(((newPrice * newQuantity) / 100).toFixed(2)),
      };

      updatedOrders.push(newOrder);
    }
  } else if (updatedOrders.length > fixedCount) {
    // If order count is excessive, remove extra orders
    updatedOrders = updatedOrders.slice(0, fixedCount);
  }

  // Ensure sorted by price
  updatedOrders = isAsk
    ? updatedOrders.sort((a, b) => a.price - b.price) // Ascending order for asks
    : updatedOrders.sort((a, b) => b.price - a.price); // Descending order for bids

  // Ensure proper price relationships
  if (isAsk && otherSideLowestPrice !== undefined) {
    // Ensure all ask prices are higher than the highest bid price
    updatedOrders = updatedOrders.map((order, index) => {
      const minPrice = parseFloat((otherSideLowestPrice + 0.01 + index * 0.01).toFixed(2));
      if (order.price < minPrice) {
        return {
          ...order,
          price: minPrice,
          total: parseFloat(((minPrice * order.quantity) / 100).toFixed(2)),
        };
      }
      return order;
    });
  } else if (!isAsk && otherSideLowestPrice !== undefined) {
    // Ensure all bid prices are lower than the lowest ask price
    updatedOrders = updatedOrders.map((order, index) => {
      const maxPrice = parseFloat((otherSideLowestPrice - 0.01 - index * 0.01).toFixed(2));
      if (order.price > maxPrice) {
        return {
          ...order,
          price: maxPrice,
          total: parseFloat(((maxPrice * order.quantity) / 100).toFixed(2)),
        };
      }
      return order;
    });
  }

  return updatedOrders;
};

export const useOrderBook = () => {
  const basePrice = 29; // Base price in cents
  const fixedOrderCount = 10; // Fixed order count
  const [lastPrice, setLastPrice] = useState(basePrice);
  const [previousPrice, setPreviousPrice] = useState(basePrice);
  const [asks, setAsks] = useState(() =>
    generateMockOrders(basePrice, fixedOrderCount, true).sort((a, b) => a.price - b.price)
  );
  const [bids, setBids] = useState(() =>
    generateMockOrders(basePrice, fixedOrderCount, false).sort((a, b) => b.price - a.price)
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate price direction
  const priceDirection: "up" | "down" | "neutral" =
    lastPrice > previousPrice ? "up" : lastPrice < previousPrice ? "down" : "neutral";

  // Ensure latest price is within the order book range
  useEffect(() => {
    // Ensure latest price is within the order book range at initialization
    if (asks.length && bids.length) {
      const lowestAsk = asks[0].price;
      const highestBid = bids[0].price;

      // If latest price is outside the order book range, set it to the middle value
      if (lastPrice > lowestAsk || lastPrice < highestBid) {
        const midPrice = Number(((lowestAsk + highestBid) / 2).toFixed(2));
        setLastPrice(midPrice);
      }
    }
  }, []);

  // Schedule order data update
  useEffect(() => {
    const updateOrderBook = () => {
      // Get current buy/sell prices
      const currentLowestAsk = asks.length ? asks[0].price : Math.round(basePrice + 1);
      const currentHighestBid = bids.length ? bids[0].price : Math.round(basePrice - 1);

      // Ensure reasonable spread between buy/sell prices
      const minSpread = 2; // Minimum price difference in cents

      // Update ask orders, ensuring prices are higher than bids
      setAsks((prevAsks) => {
        return updateOrders(prevAsks, lastPrice, true, fixedOrderCount, currentHighestBid);
      });

      // Update bid orders, ensuring prices are lower than asks
      setBids((prevBids) => {
        // Get updated lowest ask price
        const updatedLowestAsk = asks[0]?.price || currentLowestAsk;
        return updateOrders(prevBids, lastPrice, false, fixedOrderCount, updatedLowestAsk);
      });

      // Randomly update the latest price, but ensure it's within the bid-ask range
      if (Math.random() < 0.5) {
        setPreviousPrice(lastPrice);

        // Get updated bid/ask prices
        const updatedLowestAsk = asks[0]?.price || currentLowestAsk;
        const updatedHighestBid = bids[0]?.price || currentHighestBid;

        // Ensure proper price relationship
        if (updatedHighestBid < updatedLowestAsk) {
          // Generate random price within the bid-ask range
          const range = updatedLowestAsk - updatedHighestBid;
          const randomOffset = Math.random() * range;
          const newPrice = parseFloat((updatedHighestBid + randomOffset).toFixed(2));

          setLastPrice(newPrice);
        } else {
          // If price relationship is incorrect, fix it
          const correctedAskPrice = parseFloat((updatedHighestBid + minSpread).toFixed(2));

          // Update ask prices
          setAsks((prevAsks) => {
            if (prevAsks.length) {
              return prevAsks
                .map((ask, index) => {
                  const newPrice = parseFloat((correctedAskPrice + index * 0.01).toFixed(2));
                  return {
                    ...ask,
                    price: newPrice,
                    total: parseFloat(((newPrice * ask.quantity) / 100).toFixed(2)),
                  };
                })
                .sort((a, b) => a.price - b.price);
            }
            return prevAsks;
          });

          // Set latest price to middle value between bid and ask
          setLastPrice(parseFloat((updatedHighestBid + minSpread / 2).toFixed(2)));
        }
      }
    };

    // Update every 0.5 seconds
    timerRef.current = setInterval(updateOrderBook, 500);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [lastPrice, fixedOrderCount, asks, bids, basePrice]);

  const handleOrderClick = useCallback(
    (order: OrderItem, type: "ask" | "bid") => {
      console.log(`${type} order clicked:`, order);

      // Simulate transaction, update the latest price
      setPreviousPrice(lastPrice);
      setLastPrice(order.price);

      // Update order quantity (simulate partial transaction)
      if (type === "ask") {
        setAsks((prevAsks) => {
          let updated = prevAsks.map((ask) =>
            ask.price === order.price
              ? { ...ask, quantity: Math.max(0, ask.quantity - Math.floor(ask.quantity * 0.3)) }
              : ask
          );

          // Remove orders with quantity 0
          updated = updated.filter((ask) => ask.quantity > 0);

          // If order count is insufficient, add new orders
          if (updated.length < fixedOrderCount) {
            const lastAsk = updated[updated.length - 1];
            const newPrice = Number((lastAsk.price + 0.5).toFixed(2));
            const newQuantity = Math.floor(Math.random() * 10000) + 1000;

            updated.push({
              price: newPrice,
              quantity: newQuantity,
              total: Number(((newPrice * newQuantity) / 100).toFixed(2)),
            });
          }

          return updated.sort((a, b) => a.price - b.price);
        });
      } else {
        setBids((prevBids) => {
          let updated = prevBids.map((bid) =>
            bid.price === order.price
              ? { ...bid, quantity: Math.max(0, bid.quantity - Math.floor(bid.quantity * 0.3)) }
              : bid
          );

          // Remove orders with quantity 0
          updated = updated.filter((bid) => bid.quantity > 0);

          // If order count is insufficient, add new orders
          if (updated.length < fixedOrderCount) {
            const firstBid = updated[0];
            const newPrice = Number((firstBid.price - 0.5).toFixed(2));
            const newQuantity = Math.floor(Math.random() * 10000) + 1000;

            updated.push({
              price: newPrice,
              quantity: newQuantity,
              total: Number(((newPrice * newQuantity) / 100).toFixed(2)),
            });
          }

          return updated.sort((a, b) => b.price - a.price);
        });
      }
    },
    [lastPrice, fixedOrderCount]
  );

  return {
    asks,
    bids,
    summary: {
      lastPrice,
      spread: asks.length && bids.length ? Number((asks[0].price - bids[0].price).toFixed(2)) : 0,
      priceDirection,
    },
    config: {
      priceUnit: "$",
      quantityLabel: "Quantity",
      totalLabel: "Total",
      askColor: "text-red-500",
      bidColor: "text-green-500",
    },
    onOrderClick: handleOrderClick,
  };
};
