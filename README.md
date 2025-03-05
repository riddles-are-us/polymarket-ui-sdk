# Polymarket UI SDK

A comprehensive React component library for building decentralized prediction market interfaces, designed specifically for Polymarket applications.

## Features

- 📊 Market Components
  - Market Page Layout
  - Trading Panel
  - Order Book
  - Market Charts
  - Comments Section
- 🎨 UI Components
  - Responsive Navbar
  - Dark Mode Support
  - Tailwind CSS Integration
- 📱 Responsive Design
- 🌙 Dark Mode Support
- 📚 Storybook Documentation

## Installation

```bash
npm install polymarket-ui
```

## Requirements

- React ^19.0.0
- React DOM ^19.0.0
- Node.js (Latest LTS version recommended)

## Quick Start

```jsx
import { MarketPage, TradingPanel, OrderBook } from "polymarket-ui";

function App() {
  return (
    <MarketPage>
      <TradingPanel />
      <OrderBook />
    </MarketPage>
  );
}
```

## Dark Mode

The SDK comes with built-in dark mode support using Tailwind CSS. To use dark mode in your application:

1. Wrap your application with the `ThemeProvider`:

```jsx
import { ThemeProvider } from "polymarket-ui";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

2. Use the dark mode hook in your components:

```jsx
import { useDarkMode } from "polymarket-ui";

function Component() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div>
      <button onClick={toggleDarkMode}>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</button>
    </div>
  );
}
```

The dark mode state is automatically persisted in localStorage and applies the appropriate Tailwind CSS classes (`dark:`) to your components.

## Available Components

### MarketPage

The main container component for displaying prediction market information.

### TradingPanel

Interactive component for executing trades and managing positions.

### OrderBook

Real-time display of market orders and trading activity.

### MarketChart

Price history and market trend visualization component.

### Comments

Community discussion and market sentiment component.

### Navbar

Customizable navigation component with built-in dark mode toggle.

## Development

### Setup

```bash
# Clone the repository
git clone

# Install dependencies
npm install

# Start Storybook development server
npm run storybook
```

### Scripts

- `npm run dev` - Start development server (No page demo yet)
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook development environment
- `npm run build-storybook` - Build Storybook for deployment

## Storybook

We use Storybook for component development and documentation. To view the component library:

1. Run `npm run storybook`
2. Open `http://localhost:6006` in your browser

## Technologies

- React
- TypeScript
- Tailwind CSS
- Storybook
- Vite
- Rollup
- Recharts (for charts)
- React Router DOM

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
