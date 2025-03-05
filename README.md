# Polymarket UI SDK

A React component library for building Polymarket-style UIs.

## Installation

```bash
npm install polymarket-ui
```

## Usage

1. Wrap your app with ThemeProvider:

```jsx
import { ThemeProvider } from "polymarket-ui";

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

2. Use components:

```jsx
import { MarketPageWidget, OrderBookWidget, TradingPanelWidget, useThemeContext } from "polymarket-ui";

function MyMarketPage() {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <div>
      <button onClick={toggleDarkMode}>Toggle {isDarkMode ? "Light" : "Dark"} Mode</button>

      <MarketPageWidget />

      {/* Or use individual components */}
      <OrderBookWidget />
      <TradingPanelWidget currentPrice={75} maxAmount={1000} />
    </div>
  );
}
```

## Features

- 🌗 Dark/Light mode support with ThemeProvider
- 📊 Market charts and order books
- 💰 Trading panels
- 💬 Comments section
- 📱 Responsive design
- 🎨 Customizable styling with Tailwind CSS

## Components

- `MarketPageWidget`: A complete market page layout
- `OrderBookWidget`: Real-time order book display
- `TradingPanelWidget`: Trading interface with buy/sell options
- `MarketChartWidget`: Price chart visualization
- `CommentsWidget`: Discussion and comments section
- `NavbarWidget`: Navigation bar

## Hooks

- `useThemeContext`: Access and control theme settings
- `useOrderBook`: Order book data and functionality
- `useTradingPanel`: Trading panel state and actions
- `useMarketChart`: Chart data and controls
- `useComments`: Comments functionality

## Styling

This package uses Tailwind CSS for styling. Make sure to include Tailwind CSS in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update your tailwind.config.js:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/polymarket-ui/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
```
