# SkyCast - Weather Dashboard

A premium, production-quality weather dashboard built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Beautiful Glassmorphism UI** - Modern, premium design with glass effects and subtle animations
- **Real-time Weather Data** - Powered by OpenWeather API
- **Animated Weather Icons** - Dynamic icons that respond to weather conditions
- **Dark/Light Mode** - Smooth theme transitions with localStorage persistence
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Micro-interactions** - Smooth animations and hover effects throughout
- **Loading & Error States** - Polished user feedback for all states

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get your OpenWeather API key:**
   - Sign up at [OpenWeather](https://openweathermap.org/api)
   - Get your free API key

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Replace `your_openweather_api_key_here` with your actual API key:
     ```
     VITE_WEATHER_API_KEY=your_actual_api_key
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── ThemeToggle.tsx
│   ├── SearchBar.tsx
│   ├── WeatherHero.tsx
│   ├── WeatherIcon.tsx
│   ├── WeatherStats.tsx
│   ├── WeatherStatCard.tsx
│   ├── LoadingState.tsx
│   ├── ErrorState.tsx
│   └── InitialState.tsx
├── pages/              # Page components
│   └── WeatherDashboard.tsx
├── services/           # API services
│   └── weatherApi.ts
├── types/              # TypeScript types
│   └── weather.ts
├── utils/              # Utility functions
│   ├── formatDate.ts
│   └── weatherUtils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Features in Detail

### Weather Data
- Current temperature
- Feels like temperature
- Humidity percentage
- Wind speed (km/h)
- Weather condition with animated icons
- Location (city, country)
- Current date

### UI/UX
- Glassmorphism cards with backdrop blur
- Animated gradient background blobs
- Smooth entrance animations
- Hover effects on interactive elements
- Keyboard accessible search
- Loading state with animated indicators
- Error state with retry functionality
- Initial welcome state

### Theme
- Light mode with soft blue/purple gradients
- Dark mode with deep navy/blue/purple glows
- System preference detection on first visit
- localStorage persistence
- Smooth transitions between themes

## License

MIT
