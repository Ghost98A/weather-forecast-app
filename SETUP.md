# Weather Forecast App Setup Guide

## Prerequisites

This app requires **Bun** for development (recommended) or you can use npm/yarn.

### Install Bun (Recommended)

```bash
curl -fsSL https://bun.sh/install | bash
```

Or use npm/yarn as an alternative.

## Installation Steps

### 1. Install Dependencies

**With Bun (Recommended):**
```bash
bun install
```

**With npm:**
```bash
npm install
```

**With yarn:**
```bash
yarn install
```

### 2. Environment Setup

The app is configured for **demo mode** by default (no token required).

For production use:
1. Sign up at [Subscribe.dev](https://platform.subscribe.dev)
2. Create a new project
3. Copy your **Project Public Key** (starts with `pub_`)
4. Create/update the `.env` file:

```bash
VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=pub_your_actual_token_here
```

### 3. Run the App

**Development Mode:**
```bash
# With Bun
bun run dev

# With npm
npm run dev

# With yarn
yarn dev
```

**Build for Production:**
```bash
# With Bun
bun run build

# With npm
npm run build

# With yarn
yarn build
```

## Features

- ✅ AI-powered weather forecasts using GPT-4o
- ✅ User authentication via Subscribe.dev
- ✅ Credit tracking and subscription management
- ✅ Beautiful, responsive UI
- ✅ Real-time error handling
- ✅ Loading states and animations
- ✅ Demo mode for testing (no signup required)

## Tech Stack

- React 18 (TypeScript)
- Vite
- Subscribe.dev React SDK
- OpenAI GPT-4o (via Subscribe.dev)

## Usage

1. **Sign In**: Click "Sign In to Continue" (demo mode requires no account)
2. **Enter Location**: Type any city name (e.g., "New York", "London", "Tokyo")
3. **Get Forecast**: Click "Get Forecast" or press Enter
4. **View Results**: See detailed AI-generated weather forecast
5. **Manage Subscription**: Click "Manage Plan" to upgrade for more credits

## Troubleshooting

### React Version Issues
If you encounter React version errors, ensure you're using React 18:
```bash
npm remove react react-dom @types/react @types/react-dom
npm install react@^18.2.0 react-dom@^18.2.0 @types/react@^18.2.0 @types/react-dom@^18.2.0
```

### Environment Variables Not Loading
- Ensure `.env` file is in the project root
- Restart dev server after changing `.env`
- Use `VITE_` prefix for all environment variables

### Token Issues
- Verify token starts with `pub_`
- For development, just remove the token to use demo mode
- Get a fresh token from [Subscribe.dev Dashboard](https://platform.subscribe.dev)

## Development

The app follows React Hooks best practices with component separation for authentication states:
- `SignInScreen.tsx` - Unauthenticated view
- `WeatherApp.tsx` - Main authenticated application

All Subscribe.dev hooks are properly isolated to avoid conditional hook calls.