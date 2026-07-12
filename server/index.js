import { createApp } from './app.js'
import { env, validateEnv } from './config/env.js'

validateEnv()

const app = createApp()
const server = app.listen(env.port, () => {
  console.log(`ClimateX → http://localhost:${env.port} (${env.nodeEnv})`)
})

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`)
  server.close(() => {
    console.log('Server closed.')
    process.exit(0)
  })
  setTimeout(() => {
    console.error('Forced shutdown after timeout.')
    process.exit(1)
  }, 10000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
  process.exit(1)
})
