import React from 'react'
import { useLiveCityTime } from '../hooks/useLiveCityTime'

const LiveClock = ({ tzId }) => {
  const timeData = useLiveCityTime(tzId)

  if (!tzId || !timeData.time) {
    return (
      <div className="flex flex-col gap-1.5 animate-pulse min-w-[7.5rem]">
        <div className="h-5 bg-white/10 rounded-full w-24" />
        <div className="h-3.5 bg-white/10 rounded-full w-32" />
      </div>
    )
  }

  const rawTime = timeData.time
  const timePart = rawTime.slice(0, -3)
  const period = timeData.dayPeriod

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-base sm:text-lg font-semibold text-on-surface tracking-tight">
          {timePart}
        </span>
        <span className="font-mono text-xs font-medium text-primary uppercase">
          {period}
        </span>
      </div>
      <span className="font-body text-xs text-on-surface-variant">
        {timeData.date}
      </span>
    </div>
  )
}

export default LiveClock
