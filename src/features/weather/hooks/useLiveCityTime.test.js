import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLiveCityTime } from './useLiveCityTime'

describe('useLiveCityTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-12T15:45:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return null values when tzId is empty or undefined', () => {
    const { result } = renderHook(() => useLiveCityTime(null))
    expect(result.current).toEqual({
      time: null,
      date: null,
      dayPeriod: null,
      time24: null,
      time12: null,
      shortDate: null,
    })
  })

  it('should format correct time and date for a specific IANA timezone', () => {
    const { result } = renderHook(() => useLiveCityTime('America/New_York'))

    expect(result.current.time).toContain('11:45:00')
    expect(result.current.dayPeriod).toBe('AM')
    expect(result.current.date).toBe('Sunday, July 12')
  })

  it('should update the ticking time every second', () => {
    const { result } = renderHook(() => useLiveCityTime('America/New_York'))

    expect(result.current.time).toContain('11:45:00')

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.time).toContain('11:45:01')

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.time).toContain('11:45:03')
  })
})
