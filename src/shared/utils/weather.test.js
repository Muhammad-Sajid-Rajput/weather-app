import { describe, it, expect } from 'vitest'
import { getIconPath, getBackgroundImage } from './weather.js'

describe('Weather Utilities', () => {
  describe('getIconPath', () => {
    it('should return empty string if no code is provided', () => {
      expect(getIconPath('', true)).toBe('')
      expect(getIconPath(null, true)).toBe('')
      expect(getIconPath(undefined, false)).toBe('')
    })

    it('should return day folder path when isDay is true', () => {
      expect(getIconPath(1000, true)).toBe('/home/day/1000.webp')
      expect(getIconPath('1003', true)).toBe('/home/day/1003.webp')
    })

    it('should return night folder path when isDay is false or falsy', () => {
      expect(getIconPath(1000, false)).toBe('/home/night/1000.webp')
      expect(getIconPath(1006, 0)).toBe('/home/night/1006.webp')
    })
  })

  describe('getBackgroundImage', () => {
    it('should return rainny background for rainy conditions', () => {
      expect(getBackgroundImage(12, 'Light rain')).toBe('/home/bg/rainny.webp')
      expect(getBackgroundImage(20, 'Heavy rain')).toBe('/home/bg/rainny.webp')
      expect(getBackgroundImage(8, 'Patchy rain nearby')).toBe('/home/bg/rainny.webp')
      expect(getBackgroundImage(15, 'Thundery outbreaks in nearby')).toBe('/home/bg/rainny.webp')
      expect(getBackgroundImage(6, 'Moderate or heavy rain shower')).toBe('/home/bg/rainny.webp')
    })

    it('should return sunrise background for hours between 5 and 7', () => {
      expect(getBackgroundImage(5, 'Sunny')).toBe('/home/bg/sunrise.webp')
      expect(getBackgroundImage(7, 'Clear')).toBe('/home/bg/sunrise.webp')
    })

    it('should return day background for hours between 8 and 15', () => {
      expect(getBackgroundImage(8, 'Partly cloudy')).toBe('/home/bg/day.webp')
      expect(getBackgroundImage(12, 'Clear')).toBe('/home/bg/day.webp')
      expect(getBackgroundImage(15, 'Overcast')).toBe('/home/bg/day.webp')
    })

    it('should return evening background for hours between 16 and 18', () => {
      expect(getBackgroundImage(16, 'Partly cloudy')).toBe('/home/bg/evening.webp')
      expect(getBackgroundImage(18, 'Clear')).toBe('/home/bg/evening.webp')
    })

    it('should return night background for other hours', () => {
      expect(getBackgroundImage(19, 'Clear')).toBe('/home/bg/night.webp')
      expect(getBackgroundImage(4, 'Partly cloudy')).toBe('/home/bg/night.webp')
      expect(getBackgroundImage(23, 'Overcast')).toBe('/home/bg/night.webp')
    })

    it('should fallback to current local hour if hour is not specified', () => {
      const currentHour = new Date().getHours();
      const expectedBg = getBackgroundImage(currentHour, 'Clear');
      expect(getBackgroundImage(null, 'Clear')).toBe(expectedBg);
      expect(getBackgroundImage(undefined, 'Clear')).toBe(expectedBg);
    })
  })
})
