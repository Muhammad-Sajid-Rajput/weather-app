import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { favoritesStorage, historyStorage, themeStorage } from './storage.js'

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('favoritesStorage', () => {
    it('should add a city to favorites', () => {
      const result = favoritesStorage.add('New York')
      expect(result).toBe(true)
      expect(favoritesStorage.getAll()).toContain('New York')
    })

    it('should not add duplicate cities', () => {
      favoritesStorage.add('London')
      favoritesStorage.add('london') // case insensitive
      const cities = favoritesStorage.getAll()
      expect(cities).toHaveLength(1)
    })

    it('should remove a city from favorites', () => {
      favoritesStorage.add('Tokyo')
      favoritesStorage.remove('Tokyo')
      expect(favoritesStorage.getAll()).not.toContain('Tokyo')
    })

    it('should check if a city is in favorites', () => {
      favoritesStorage.add('Paris')
      expect(favoritesStorage.has('Paris')).toBe(true)
      expect(favoritesStorage.has('Berlin')).toBe(false)
    })

    it('should clear all favorites', () => {
      favoritesStorage.add('City1')
      favoritesStorage.add('City2')
      favoritesStorage.clearAll()
      expect(favoritesStorage.getAll()).toHaveLength(0)
    })
  })

  describe('historyStorage', () => {
    it('should add a city to history', () => {
      historyStorage.add('Miami')
      expect(historyStorage.getAll()).toContain('Miami')
    })

    it('should limit history to MAX items', () => {
      for (let i = 1; i <= 10; i++) {
        historyStorage.add(`City${i}`)
      }
      const history = historyStorage.getAll()
      expect(history.length).toBeLessThanOrEqual(historyStorage.MAX)
    })

    it('should remove a city from history', () => {
      historyStorage.add('Seattle')
      historyStorage.remove('Seattle')
      expect(historyStorage.getAll()).not.toContain('Seattle')
    })

    it('should clear all history', () => {
      historyStorage.add('City1')
      historyStorage.clearAll()
      expect(historyStorage.getAll()).toHaveLength(0)
    })
  })

  describe('themeStorage', () => {
    it('should default to dark theme', () => {
      expect(themeStorage.get()).toBe('dark')
    })

    it('should set and get light theme', () => {
      themeStorage.set('light')
      expect(themeStorage.get()).toBe('light')
    })

    it('should set and get dark theme', () => {
      themeStorage.set('dark')
      expect(themeStorage.get()).toBe('dark')
    })

    it('should handle invalid theme values', () => {
      themeStorage.set('invalid')
      expect(themeStorage.get()).toBe('dark')
    })
  })
})
