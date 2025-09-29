# AI Weather Forecast App

An intelligent weather forecasting application powered by AI (GPT-4o) and built with React 18, TypeScript, and the Subscribe.dev platform.

## Features

- **AI-Powered Forecasts**: Get detailed, personalized weather predictions using GPT-4o
- **User Authentication**: Secure sign-in flow via Subscribe.dev
- **Credit Tracking**: Monitor your API usage with real-time credit balance
- **Subscription Management**: Upgrade plans and manage billing through integrated Stripe
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Error Handling**: Comprehensive error states including rate limiting and insufficient credits
- **Demo Mode**: Try the app without signing up (limited functionality)

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **AI Platform**: Subscribe.dev React SDK
- **AI Model**: OpenAI GPT-4o (for weather forecasting)
- **Styling**: Custom CSS with CSS variables for theming

## Quick Start

### Prerequisites

- Node.js 16+ or Bun (recommended)
- npm, yarn, or bun package manager

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
bun run build
```

## Configuration

### Demo Mode (Default)

The app is configured for demo mode by default - no API token required! Just install and run.

### Production Mode

For production use with your own Subscribe.dev project:

1. Sign up at [Subscribe.dev](https://platform.subscribe.dev)
2. Create a new project
3. Copy your **Project Public Key** (starts with `pub_`)
4. Create a `.env` file in the project root:

```bash
VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=pub_your_actual_token_here
```

5. Restart the development server

## Usage

1. **Sign In**: Click "Sign In to Continue" on the welcome screen
   - In demo mode, this creates a temporary session
   - In production mode, this uses Subscribe.dev authentication

2. **Enter Location**: Type any city name (e.g., "New York", "London", "Tokyo")

3. **Get Forecast**: Click "Get Forecast" or press Enter

4. **View Results**: See a detailed AI-generated weather forecast including:
   - Current conditions
   - Temperature information
   - Precipitation chances
   - Wind conditions
   - Multi-day forecast

5. **Manage Subscription**: Click "Manage Plan" to upgrade for more credits

## Project Structure

```
src/
├── components/
│   ├── SignInScreen.tsx    # Authentication screen
│   └── WeatherApp.tsx       # Main weather app (authenticated)
├── App.tsx                  # Root component with auth routing
├── App.css                  # App-level styles
├── index.css                # Global styles and CSS variables
└── main.tsx                 # App entry point with SubscribeDevProvider
```

## Key Features

### Component Separation Pattern

The app follows React Hooks best practices with proper component separation:
- Authentication state is handled at the top level in `App.tsx`
- `SignInScreen` handles the unauthenticated state
- `WeatherApp` handles the authenticated state with full access to Subscribe.dev hooks

This pattern avoids conditional hook calls and ensures React Hooks rules are followed.

### Error Handling

Comprehensive error handling for:
- **Insufficient Credits**: Shows upgrade prompt
- **Rate Limiting**: Displays retry timer
- **Network Errors**: User-friendly error messages with retry option
- **Invalid Input**: Input validation and feedback

### Loading States

- Animated spinner during AI generation
- Disabled states for buttons during operations
- Loading text with contextual messages

### Responsive Design

- Mobile-first approach
- Flexbox-based layouts
- Proper spacing and touch targets
- Adapts to different screen sizes

## Troubleshooting

See [SETUP.md](./SETUP.md) for detailed troubleshooting steps.

Common issues:
- React version conflicts → Ensure React 18.x
- Environment variables not loading → Check `.env` file and restart server
- Token issues → Use demo mode (remove token) or get fresh token from Subscribe.dev

## Development

### Adding New Features

1. Follow the component separation pattern
2. Use TypeScript for type safety
3. Follow the established styling patterns
4. Handle loading and error states
5. Test with both demo and production modes

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Proper error boundaries
- Accessibility considerations (WCAG AA)
- Performance optimizations

## Deployment

This project includes automated deployment via VGit workflows. Push to any branch to trigger a preview deployment.

## License

This project was created using VGit AI-powered development tools.

---

*Generated with [VGit](https://vgit.app) 🤖*
