import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { weatherCache } from './weatherCache.js'

describe('Weather Cache', () => {
  beforeEach(() => {
    weatherCache.clearAll()
  })

  afterEach(() => {
    weatherCache.clearAll()
  })

  it('should store and retrieve weather data', () => {
    const mockData = {
      location: { name: 'London', lat: 51.5, lon: -0.12 },
      current: { temp: 20, condition: 'Sunny' },
    }
    
    weatherCache.set('London', mockData)
    const retrieved = weatherCache.get('London')
    
    expect(retrieved).toEqual(mockData)
  })

  it('should return null for non-existent city', () => {
    const result = weatherCache.get('NonExistentCity')
    expect(result).toBeNull()
  })

  it('should remove cached data', () => {
    const mockData = {
      location: { name: 'Paris', lat: 48.85, lon: 2.35 },
      current: { temp: 15, condition: 'Cloudy' },
    }
    
    weatherCache.set('Paris', mockData)
    weatherCache.remove('Paris')
    
    expect(weatherCache.get('Paris')).toBeNull()
  })

  it('should clear all cached data', () => {
    weatherCache.set('City1', { location: { name: 'City1' }, current: {} })
    weatherCache.set('City2', { location: { name: 'City2' }, current: {} })
    
    weatherCache.clearAll()
    
    expect(weatherCache.get('City1')).toBeNull()
    expect(weatherCache.get('City2')).toBeNull()
  })

  it('should handle empty input gracefully', () => {
    expect(weatherCache.get('')).toBeNull()
    expect(weatherCache.get(null)).toBeNull()
    expect(weatherCache.set(null, {})).toBeUndefined()
    expect(weatherCache.set('', {})).toBeUndefined()
  })
})
