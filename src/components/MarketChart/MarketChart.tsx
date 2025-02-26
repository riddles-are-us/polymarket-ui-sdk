import React from "react";

export interface MarketData {
  title: string;
  volume: string;
  endDate: string;
  currentPrice: number;
  priceChange: number;
  chartData: Array<{
    date: string;
    price: number;
  }>;
}

export interface MarketChartProps {
  data: MarketData;
  onBookmark?: () => void;
  onShare?: () => void;
  onCopy?: () => void;
}

export const MarketChart: React.FC<MarketChartProps> = ({ data, onBookmark, onShare, onCopy }) => {
  const { title, volume, endDate, currentPrice, priceChange, chartData } = data;

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>Volume: {volume}</span>
            <span>End Date: {endDate}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={onBookmark} className="p-2 text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <button onClick={onShare} className="p-2 text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button onClick={onCopy} className="p-2 text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{currentPrice}¢</span>
          <span className={`text-lg ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {priceChange >= 0 ? "+" : ""}
            {priceChange}%
          </span>
        </div>
      </div>

      <div className="h-64 bg-gray-800 rounded-lg p-4">
        {/* Chart placeholder - You'll need to integrate a charting library like recharts or chart.js */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Chart Component (Integrate with your preferred charting library)
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button className="px-4 py-2 text-gray-400 hover:text-white">1H</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white">6H</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white">1D</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white">1W</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white">1M</button>
        <button className="px-4 py-2 text-white bg-gray-800 rounded">ALL</button>
      </div>
    </div>
  );
};
