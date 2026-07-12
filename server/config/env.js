import dotenv from 'dotenv'

dotenv.config()

const getEnv = (key, fallback = '') => process.env[key] ?? fallback

const parsePort = (value) => {
  const port = Number(value)
  if (!Number.isInteger(port) || port < 1 || port > 65535) return 5000
  return port
}

export const env = {
  port: parsePort(getEnv('PORT', '5000')),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  weatherApiKey: getEnv('WEATHER_API_KEY', ''),
  clientUrl: getEnv('CLIENT_URL', ''),
  isProduction: getEnv('NODE_ENV', 'development') === 'production',
  rateLimitWindowMs: Number(getEnv('RATE_LIMIT_WINDOW_MS', '900000')),
  rateLimitMax: Number(getEnv('RATE_LIMIT_MAX', '500')),
}

export const validateEnv = () => {
  if (!env.weatherApiKey) {
    const message = '[config] WEATHER_API_KEY is required.'
    if (env.isProduction) {
      console.error(message)
      process.exit(1)
    }
    console.warn(`${message} Weather endpoints will fail until it is set.`)
  }

  if (env.isProduction && !env.clientUrl) {
    console.info('[config] CLIENT_URL not set — using same-origin (single-server deploy).')
  }
}
