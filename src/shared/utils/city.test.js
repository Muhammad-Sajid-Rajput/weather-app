import { describe, it, expect } from 'vitest'
import { slugifyCity, deslugifyCity, isValidCityName } from './city.js'

describe('City Utilities', () => {
  describe('slugifyCity', () => {
    it('should convert city name to slug', () => {
      expect(slugifyCity('New York')).toBe('new-york')
      expect(slugifyCity('Los Angeles')).toBe('los-angeles')
    })

    it('should handle special characters', () => {
      expect(slugifyCity('São Paulo')).toBe('s-o-paulo')
      expect(slugifyCity('Zürich')).toBe('z-rich')
    })

    it('should handle multiple spaces', () => {
      expect(slugifyCity('San  Francisco')).toBe('san-francisco')
    })

    it('should return empty string for empty input', () => {
      expect(slugifyCity('')).toBe('')
      expect(slugifyCity(null)).toBe('')
    })

    it('should trim whitespace', () => {
      expect(slugifyCity('  London  ')).toBe('london')
    })
  })

  describe('deslugifyCity', () => {
    it('should convert slug back to city name', () => {
      expect(deslugifyCity('new-york')).toBe('new york')
      expect(deslugifyCity('los-angeles')).toBe('los angeles')
    })

    it('should handle URL encoding', () => {
      expect(deslugifyCity('s%C3%A3o-paulo')).toBe('são paulo')
    })

    it('should handle empty input', () => {
      expect(deslugifyCity('')).toBe('')
      expect(deslugifyCity(null)).toBe('')
    })

    it('should handle malformed URL encoding gracefully', () => {
      expect(deslugifyCity('invalid%')).toBe('invalid%')
    })
  })

  describe('isValidCityName', () => {
    it('should validate valid city names', () => {
      expect(isValidCityName('London')).toBe(true)
      expect(isValidCityName('New York')).toBe(true)
      expect(isValidCityName('San Francisco')).toBe(true)
    })

    it('should reject names that are too short', () => {
      expect(isValidCityName('A')).toBe(false)
      expect(isValidCityName('')).toBe(false)
      expect(isValidCityName('  ')).toBe(false)
    })

    it('should reject names that are too long', () => {
      const longName = 'A'.repeat(101)
      expect(isValidCityName(longName)).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isValidCityName('AB')).toBe(true) // minimum valid
      expect(isValidCityName('A'.repeat(100))).toBe(true) // maximum valid
      expect(isValidCityName(null)).toBe(false)
      expect(isValidCityName(undefined)).toBe(false)
    })
  })
})
