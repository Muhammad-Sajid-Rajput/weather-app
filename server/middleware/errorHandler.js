import { AppError } from '../utils/AppError.js'
import { env } from '../config/env.js'

export const notFound = (req, res, next) => {
  next(new AppError(`Not found: ${req.method} ${req.originalUrl}`, 404))
}

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = 500
  let message = 'Internal server error'

  if (err instanceof AppError || err.name === 'AppError' || err.statusCode) {
    statusCode = err.statusCode || 500
    message = err.message
  } else if (err.type === 'entity.parse.failed') {
    statusCode = 400
    message = 'Invalid JSON in request body.'
  } else if (err.code === 'ECONNABORTED') {
    statusCode = 504
    message = 'Weather service timed out. Please try again.'
  } else if (err.message) {
    message = env.isProduction ? 'Something went wrong.' : err.message
  }

  if (!env.isProduction && err.stack) {
    console.error(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(!env.isProduction && err.stack && { stack: err.stack }),
  })
}
