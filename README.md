# Polymarket UI SDK

A React component library for building Polymarket-like prediction market interfaces.

## Installation

```bash
npm install polymarket-ui-sdk
```

## Usage

This SDK provides several components that can be used to build a prediction market interface:

### MarketPage

The main component that combines all other components into a complete market page:

```tsx
import { MarketPage } from 'polymarket-ui-sdk';

function App() {
  return (
    <MarketPage
      marketData={{
        title: 'Will Kanye launch a coin in February?',
        volume: '$23,699,480',
        endDate: 'Feb 28, 2025',
        currentPrice: 23,
        priceChange: 1.2,
        chartData: [...],
      }}
      orderBook={{
        asks: [...],
        bids: [...],
        lastPrice: 21,
        spread: 1,
      }}
      comments={[...]}
      totalComments={10448}
    />
  );
}
```

### Individual Components

You can also use individual components:

#### Navbar

```tsx
import { Navbar } from "polymarket-ui-sdk";

<Navbar
  onSearch={(query) => console.log(query)}
  onLogin={() => console.log("Login")}
  onSignUp={() => console.log("Sign up")}
  isLoggedIn={false}
/>;
```

#### MarketChart

```tsx
import { MarketChart } from 'polymarket-ui-sdk';

<MarketChart
  data={{
    title: 'Market Title',
    volume: '$1,000,000',
    endDate: '2025-02-28',
    currentPrice: 50,
    priceChange: 2.5,
    chartData: [...],
  }}
  onBookmark={() => {}}
  onShare={() => {}}
  onCopy={() => {}}
/>
```

#### TradingPanel

```tsx
import { TradingPanel } from "polymarket-ui-sdk";

<TradingPanel currentPrice={50} onTrade={(type, amount) => console.log(type, amount)} maxAmount={1000} />;
```

#### OrderBook

```tsx
import { OrderBook } from 'polymarket-ui-sdk';

<OrderBook
  asks={[...]}
  bids={[...]}
  lastPrice={50}
  spread={1}
  onOrderClick={(order, type) => console.log(order, type)}
/>
```

#### Comments

```tsx
import { Comments } from 'polymarket-ui-sdk';

<Comments
  comments={[...]}
  totalComments={100}
  onAddComment={(content) => console.log(content)}
  onLikeComment={(id) => console.log(id)}
/>
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Storybook:
   ```bash
   npm run storybook
   ```
4. Build the package:
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
