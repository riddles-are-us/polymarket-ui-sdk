import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { useThemeContext } from "../../contexts/ThemeContext";

export interface ChartData {
  date: string;
  price: number;
}

export interface MarketChartUIProps {
  title: string;
  subtitle?: string;
  mainValue: string;
  mainValueUnit?: string;
  changeValue: number;
  chartData: ChartData[];
  timeRanges?: string[];
  selectedTimeRange?: string;
  onTimeRangeChange?: (range: string) => void;
  actions?: {
    onBookmark?: () => void;
    onShare?: () => void;
    onCopy?: () => void;
  };
  logo?: string;
}

export const MarketChartUI: React.FC<MarketChartUIProps> = ({
  title,
  subtitle,
  mainValue,
  mainValueUnit = "$",
  changeValue,
  chartData,
  timeRanges = ["1H", "6H", "1D", "1W", "1M", "ALL"],
  selectedTimeRange = "ALL",
  onTimeRangeChange,
  actions,
  logo,
}) => {
  const { isDarkMode } = useThemeContext();

  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MMM d");
  };

  const formatTooltipDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MMM d, HH:mm");
  };

  const chartColors = {
    grid: isDarkMode ? "#374151" : "#E5E7EB",
    text: isDarkMode ? "#9CA3AF" : "#6B7280",
    tooltip: {
      bg: isDarkMode ? "#1F2937" : "#FFFFFF",
      text: isDarkMode ? "#F3F4F6" : "#111827",
      border: isDarkMode ? "#374151" : "#E5E7EB",
    },
    line: {
      stroke: "#3B82F6",
      fill: isDarkMode ? "#1E40AF" : "#DBEAFE",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {logo && (
            <img 
              src={logo} 
              alt={`${title} logo`} 
              className="w-8 h-8 mr-3 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
        </div>
        {actions && (
          <div className="flex space-x-2">
            {actions.onBookmark && (
              <button
              onClick={actions.onBookmark}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              aria-label="Bookmark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            )}
            {actions.onShare && (
              <button
              onClick={actions.onShare}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              aria-label="Share"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            )}
            {actions.onCopy && (
              <button
              onClick={actions.onCopy}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              aria-label="Copy"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {mainValue}
          {mainValueUnit}
        </span>
        <span className={`ml-2 text-sm ${changeValue >= 0 ? "text-green-500" : "text-red-500"}`}>
          {changeValue >= 0 ? "+" : ""}
          {changeValue}%
        </span>
      </div>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke={chartColors.text}
              tick={{ fill: chartColors.text }}
            />
            <YAxis
              stroke={chartColors.text}
              tick={{ fill: chartColors.text }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.tooltip.bg,
                border: `1px solid ${chartColors.tooltip.border}`,
                borderRadius: "0.375rem",
                color: chartColors.tooltip.text,
              }}
              labelFormatter={formatTooltipDate}
              formatter={(value: number) => [`${value.toFixed(2)}%`, "Probability"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={chartColors.line.stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: chartColors.line.stroke }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-start space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => onTimeRangeChange?.(range)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              selectedTimeRange === range
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};
