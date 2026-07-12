import { describe, it, expect } from 'vitest'
import { aqiLabel } from './weatherIcons.js'

describe('Weather Icons Utilities', () => {
  describe('aqiLabel', () => {
    it('should return correct label for index 1-6', () => {
      expect(aqiLabel(1)).toBe('Good')
      expect(aqiLabel(2)).toBe('Moderate')
      expect(aqiLabel(3)).toBe('Unhealthy for Sensitive Groups')
      expect(aqiLabel(4)).toBe('Unhealthy')
      expect(aqiLabel(5)).toBe('Very Unhealthy')
      expect(aqiLabel(6)).toBe('Hazardous')
    })

    it('should return Unknown for out of range or undefined indices', () => {
      expect(aqiLabel(0)).toBe('Unknown')
      expect(aqiLabel(7)).toBe('Unknown')
      expect(aqiLabel(null)).toBe('Unknown')
      expect(aqiLabel(undefined)).toBe('Unknown')
    })
  })
})
