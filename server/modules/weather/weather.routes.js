import { Router } from 'express'
import { getWeather, searchLocations } from './weather.controller.js'

const router = Router()

router.get('/', getWeather)
router.get('/search', searchLocations)

export default router
