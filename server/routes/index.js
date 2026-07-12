import { Router } from 'express'
import weatherRoutes from '../modules/weather/weather.routes.js'
import { env } from '../config/env.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      app: 'ClimateX',
      environment: env.nodeEnv,
      timestamp: new Date().toISOString(),
    },
  })
})

router.use('/weather', weatherRoutes)

export default router
