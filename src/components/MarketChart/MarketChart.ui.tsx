import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

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
}

export const MarketChartUI: React.FC<MarketChartUIProps> = ({
  title,
  subtitle,
  mainValue,
  mainValueUnit = "¢",
  changeValue,
  chartData,
  timeRanges = ["1H", "6H", "1D", "1W", "1M", "ALL"],
  selectedTimeRange = "ALL",
  onTimeRangeChange,
  actions,
}) => {
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MMM d");
  };

  const formatTooltipDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MMM d, HH:mm");
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          {subtitle && <div className="text-gray-400">{subtitle}</div>}
        </div>
        {actions && (
          <div className="flex space-x-2">
            {actions.onBookmark && (
              <button onClick={actions.onBookmark} className="p-2 text-gray-400 hover:text-white">
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
            )}
            {actions.onShare && (
              <button onClick={actions.onShare} className="p-2 text-gray-400 hover:text-white">
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
            )}
            {actions.onCopy && (
              <button onClick={actions.onCopy} className="p-2 text-gray-400 hover:text-white">
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
            )}
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">
            {mainValue}
            {mainValueUnit}
          </span>
          <span className={`text-lg ${changeValue >= 0 ? "text-green-500" : "text-red-500"}`}>
            {changeValue >= 0 ? "+" : ""}
            {changeValue}%
          </span>
        </div>
      </div>

      <div className="h-64 bg-gray-800 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#6B7280" tick={{ fill: "#6B7280" }} />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: "#6B7280" }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.375rem",
                color: "#F3F4F6",
              }}
              labelFormatter={formatTooltipDate}
              formatter={(value: number) => [`${value}%`, "Probability"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3B82F6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => onTimeRangeChange?.(range)}
            className={`px-4 py-2 ${
              selectedTimeRange === range ? "text-white bg-gray-800 rounded" : "text-gray-400 hover:text-white"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};
