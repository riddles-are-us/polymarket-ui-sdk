import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { MarketChart } from "../MarketChart/MarketChart";
import { TradingPanel } from "../TradingPanel/TradingPanel";
import { OrderBook } from "../OrderBook/OrderBook";
import { Comments } from "../Comments/Comments";

export interface MarketPageProps {
  marketData: {
    title: string;
    volume: string;
    endDate: string;
    currentPrice: number;
    priceChange: number;
    chartData: Array<{
      date: string;
      price: number;
    }>;
  };
  orderBook: {
    asks: Array<{
      price: number;
      shares: number;
      total: number;
    }>;
    bids: Array<{
      price: number;
      shares: number;
      total: number;
    }>;
    lastPrice: number;
    spread: number;
  };
  comments: Array<{
    id: string;
    author: {
      name: string;
      avatar?: string;
      position?: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    userHasLiked?: boolean;
  }>;
  totalComments: number;
}

export const MarketPage: React.FC<MarketPageProps> = ({ marketData, orderBook, comments, totalComments }) => {
  const handleSearch = (query: string) => {
    console.log("Search:", query);
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };

  const handleSignUp = () => {
    console.log("Sign up clicked");
  };

  const handleTrade = (type: "buy" | "sell", amount: number) => {
    console.log("Trade:", type, amount);
  };

  const handleOrderClick = (order: any, type: "ask" | "bid") => {
    console.log("Order clicked:", type, order);
  };

  const handleAddComment = (content: string) => {
    console.log("New comment:", content);
  };

  const handleLikeComment = (commentId: string) => {
    console.log("Like comment:", commentId);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onSearch={handleSearch} onLogin={handleLogin} onSignUp={handleSignUp} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <MarketChart
              data={marketData}
              onBookmark={() => console.log("Bookmark clicked")}
              onShare={() => console.log("Share clicked")}
              onCopy={() => console.log("Copy clicked")}
            />
            <OrderBook
              asks={orderBook.asks}
              bids={orderBook.bids}
              lastPrice={orderBook.lastPrice}
              spread={orderBook.spread}
              onOrderClick={handleOrderClick}
            />
            <Comments
              comments={comments}
              totalComments={totalComments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
            />
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <TradingPanel currentPrice={marketData.currentPrice} onTrade={handleTrade} maxAmount={1000} />
          </div>
        </div>
      </div>
    </div>
  );
};
