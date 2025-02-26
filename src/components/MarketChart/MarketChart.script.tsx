import { useState, useCallback } from "react";
import { ChartData } from "./MarketChart.ui";

// Mock data generator
const generateMockChartData = (days: number): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  let basePrice = 50;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate some random price movement
    basePrice = basePrice + (Math.random() - 0.5) * 5;

    data.push({
      date: date.toISOString(),
      price: Number(basePrice.toFixed(2)),
    });
  }

  return data;
};

// Mock market data
const mockMarketData = {
  title: "Sample Market",
  subtitle: "Volume: $1.2M • End Date: Dec 31, 2024",
  mainValue: "75",
  changeValue: 2.5,
  chartData: generateMockChartData(30),
};

export const useMarketChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("ALL");
  const [data] = useState(mockMarketData);

  const handleTimeRangeChange = useCallback((range: string) => {
    setSelectedTimeRange(range);
    // In a real implementation, this would fetch new data based on the time range
  }, []);

  const handleBookmark = useCallback(() => {
    console.log("Bookmark clicked");
    // Implement bookmark logic
  }, []);

  const handleShare = useCallback(() => {
    console.log("Share clicked");
    // Implement share logic
  }, []);

  const handleCopy = useCallback(() => {
    console.log("Copy clicked");
    // Implement copy logic
  }, []);

  return {
    data,
    selectedTimeRange,
    onTimeRangeChange: handleTimeRangeChange,
    actions: {
      onBookmark: handleBookmark,
      onShare: handleShare,
      onCopy: handleCopy,
    },
  };
};
