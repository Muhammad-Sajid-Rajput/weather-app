import { useState, useEffect } from 'react'

export const useLiveCityTime = (tzId) => {
  const [timeData, setTimeData] = useState(() => getFormattedTime(tzId))

  useEffect(() => {
    if (!tzId) {
      setTimeData({ time: null, date: null, dayPeriod: null })
      return
    }

    setTimeData(getFormattedTime(tzId))

    const intervalId = setInterval(() => {
      setTimeData(getFormattedTime(tzId))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [tzId])

  return timeData
}

function getFormattedTime(tzId) {
  if (!tzId) {
    return { time: null, date: null, dayPeriod: null }
  }

  try {
    const now = new Date()

    const timeStr = new Intl.DateTimeFormat('en-US', {
      timeZone: tzId,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(now)

    const dateStr = new Intl.DateTimeFormat('en-US', {
      timeZone: tzId,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(now)

    const dayPeriod = timeStr.slice(-2)

    return {
      time: timeStr,
      date: dateStr,
      dayPeriod,
    }
  } catch (error) {
    console.error('Error formatting live city time:', error)
    return { time: null, date: null, dayPeriod: null }
  }
}
