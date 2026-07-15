# ClimateX

<p align="center">
  <img src="public/climatex_banner.png" alt="ClimateX Banner" width="100%" />
</p>

Real-Time Forecasts. Reliable Insights.

ClimateX is a production-ready full-stack weather dashboard built with React, Vite, Tailwind CSS, and Express.

Features include:
- Current weather conditions
- Hourly & 7-day forecasts
- Air quality monitoring
- UV index tracking
- Geolocation support
- Favorites & search history
- Dark/Light mode
- Responsive glassmorphism interface

Built with a secure backend proxy to protect WeatherAPI credentials and designed using modern frontend architecture principles.

## Architecture

Single repository with a clear **frontend / backend split** — standard for portfolio full-stack apps.

```
climatex/
├── server/                    # Backend (Express)
│   ├── index.js               # Entry point
│   ├── app.js                 # App factory & middleware
│   ├── config/                # env, constants
│   ├── middleware/            # asyncHandler, errorHandler
│   ├── routes/                # API route registry
│   └── modules/
│       └── weather/           # Feature module
│           ├── weather.routes.js
│           ├── weather.controller.js
│           ├── weather.service.js    # External API calls
│           └── weather.mapper.js     # Response normalization
│
├── src/                       # Frontend (React)
│   ├── app/                   # App shell, routes, providers
│   ├── pages/                 # Route-level views (thin)
│   ├── features/              # Domain features
│   │   ├── weather/           # hooks, api, components
│   │   ├── search/
│   │   └── favorites/
│   └── shared/                # Cross-cutting UI & utilities
│       ├── api/httpClient.js
│       ├── lib/storage.js
│       ├── components/
│       ├── context/
│       └── utils/
│
├── server.js                  # Boots server/index.js
├── index.html
└── vite.config.js
```

### Design principles

| Layer | Responsibility |
|-------|----------------|
| **Pages** | Compose features; no direct API calls |
| **Hooks** | Data fetching & side effects |
| **Repository** | HTTP calls to your backend |
| **Service (server)** | WeatherAPI integration |
| **Mapper (server)** | Shape raw API data for the client |
| **Controller** | HTTP request/response |
| **Middleware** | Errors, async wrapper |

### API response format

All API routes return a consistent envelope:

```json
{
  "success": true,
  "data": { }
}
```

Errors return `{ "success": false, "message": "..." }`.

## Prerequisites

- Node.js 18+
- [WeatherAPI.com](https://www.weatherapi.com/signup.aspx) API key

## Setup

```bash
npm install
cp .env.example .env
# Add WEATHER_API_KEY to .env
```

```env
PORT=5000
NODE_ENV=development
WEATHER_API_KEY=your_key_here
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite `:5173` + API `:5000` |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | Backend only |
| `npm run build` | Build SPA → `dist/` |
| `npm run start` | Production: API + static files on `PORT` |
| `npm run preview` | Build + start |

### Development

```bash
npm run dev
```

- App: http://localhost:5173  
- Health: http://localhost:5000/api/health  

Vite proxies `/api` to Express. No `VITE_API_URL` needed locally.

### Production

```bash
npm run build && npm run start
```

Open http://localhost:5000

## Deployment

Production-ready defaults: rate limiting, Helmet security headers, env validation, graceful shutdown, and consistent API error responses.

### Environment (production)

| Variable | Required | Description |
|----------|----------|-------------|
| `WEATHER_API_KEY` | Yes | WeatherAPI.com key |
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Host port (default `5000`) |
| `RATE_LIMIT_MAX` | No | Max requests per IP per window (default `100`) |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window in ms (default `900000`) |
| `CLIENT_URL` | No | Only if frontend is on a different domain |

### Deploy to Render / Railway / Fly.io

1. Connect your repo.
2. **Build command:** `npm install && npm run build`
3. **Start command:** `npm run start`
4. Add `WEATHER_API_KEY` and `NODE_ENV=production` in the dashboard.
5. Health check path: `/api/health`

Single-server deploy serves the built SPA and API from one process — no `VITE_API_URL` needed.

### Production checklist

- [ ] `WEATHER_API_KEY` set in host environment (never commit `.env`)
- [ ] `NODE_ENV=production`
- [ ] HTTPS enabled (required for geolocation in browsers)
- [ ] Health check monitoring on `/api/health`
- [ ] Run `npm run build` before `npm run start`

### Edge cases handled

| Area | Handling |
|------|----------|
| Invalid / missing city URL | User-friendly error + link home |
| Malformed URL encoding | Safe decode with fallback |
| Location not found | 404 message from API |
| API timeout / offline | 504 / connection messages |
| Rate limit (API & server) | 429 with clear message |
| Geolocation denied / timeout | Specific error per browser code |
| Non-HTTPS geolocation | Warns user |
| Request cancellation | AbortController on navigation |
| React render crash | Error boundary with recovery |
| localStorage full / blocked | Silent fail, app still works |
| Invalid coordinates | Server-side validation |
| Missing API key in prod | Server exits on startup |

## API routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/weather?location={city}` | Full forecast |
| `GET` | `/api/weather?lat={lat}&lon={lon}` | By coordinates |
| `GET` | `/api/weather/search?query={text}` | City autocomplete |

## App routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/weather/:city` | Weather details |
| `/favorites` | Saved cities |

## License

MIT
