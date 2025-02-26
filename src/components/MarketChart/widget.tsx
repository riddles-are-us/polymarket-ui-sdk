import React from "react";
import { MarketChartUI } from "./MarketChart.ui";
import { useMarketChart } from "./MarketChart.script";

export const MarketChartWidget: React.FC = () => {
  const { data, selectedTimeRange, onTimeRangeChange, actions } = useMarketChart();

  return (
    <MarketChartUI
      title={data.title}
      subtitle={data.subtitle}
      mainValue={data.mainValue}
      changeValue={data.changeValue}
      chartData={data.chartData}
      selectedTimeRange={selectedTimeRange}
      onTimeRangeChange={onTimeRangeChange}
      actions={actions}
    />
  );
};
