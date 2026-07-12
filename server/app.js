import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from './config/env.js'
import { JSON_BODY_LIMIT } from './config/constants.js'
import apiRoutes from './routes/index.js'
import { apiRateLimiter } from './middleware/rateLimiter.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

const getCorsOptions = () => {
  if (env.clientUrl) {
    return { origin: env.clientUrl, credentials: true }
  }
  if (env.isProduction) {
    return { origin: false }
  }
  return { origin: true }
}

export const createApp = () => {
  const app = express()

  if (env.isProduction) {
    app.set('trust proxy', 1)
  }

  app.use(
    helmet({
      contentSecurityPolicy: env.isProduction
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              fontSrc: ["'self'", 'https://fonts.gstatic.com'],
              imgSrc: ["'self'", 'https:', 'data:'],
              connectSrc: ["'self'"],
            },
          }
        : false,
      crossOriginEmbedderPolicy: false,
    })
  )

  app.use(cors(getCorsOptions()))
  app.use(morgan(env.isProduction ? 'combined' : 'dev'))
  app.use(express.json({ limit: JSON_BODY_LIMIT }))
  app.use(express.urlencoded({ extended: true, limit: JSON_BODY_LIMIT }))

  app.use('/api', apiRateLimiter, apiRoutes)

  if (env.isProduction) {
    const distPath = path.join(rootDir, 'dist')
    app.use(express.static(distPath, { maxAge: '1d', index: false }))

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next()
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) next(err)
      })
    })
  }

  app.use(notFound)
  app.use(errorHandler)

  return app
}
