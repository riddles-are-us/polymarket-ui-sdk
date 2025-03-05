// Components
export * from "./components";

// Hooks
export * from "./hooks";

// Types
export * from "./types";

// Contexts
export { ThemeProvider, useThemeContext } from "./contexts/ThemeContext";

// Re-export specific components and types
export {
  // Navbar
  NavbarUI,
  NavbarWidget,
  useNavbar,
} from "./components/Navbar";
export type { NavbarUIProps } from "./components/Navbar";

export {
  // Market Chart
  MarketChartUI,
  MarketChartWidget,
  useMarketChart,
} from "./components/MarketChart";
export type { MarketChartUIProps, ChartData } from "./components/MarketChart";

export {
  // Trading Panel
  TradingPanelUI,
  TradingPanelWidget,
  useTradingPanel,
} from "./components/TradingPanel";
export type { TradingPanelUIProps, TradingPanelWidgetProps } from "./components/TradingPanel";

export {
  // Order Book
  OrderBookUI,
  OrderBookWidget,
  useOrderBook,
} from "./components/OrderBook";
export type { OrderBookUIProps, OrderItem } from "./components/OrderBook";

export {
  // Comments
  CommentsUI,
  CommentsWidget,
  useComments,
} from "./components/Comments";
export type { CommentsUIProps, CommentItem, CommentAuthor } from "./components/Comments";

export {
  // Market Page
  MarketPageUI,
  MarketPageWidget,
  useMarketPage,
} from "./components/MarketPage";
export type { MarketPageUIProps, MarketPageWidgetProps } from "./components/MarketPage";
