/**
 * Get AQI label from US EPA Index (1-6)
 * @param {number} index - US EPA Index
 * @returns {string}
 */
export function aqiLabel(index) {
  switch (index) {
    case 1:
      return 'Good'
    case 2:
      return 'Moderate'
    case 3:
      return 'Unhealthy for Sensitive Groups'
    case 4:
      return 'Unhealthy'
    case 5:
      return 'Very Unhealthy'
    case 6:
      return 'Hazardous'
    default:
      return 'Unknown'
  }
}
