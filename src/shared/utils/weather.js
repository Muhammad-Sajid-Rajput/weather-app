/**
 * Helper to get the custom webp weather icon path
 * @param {number|string} conditionCode - WeatherAPI condition code (e.g. 1000)
 * @param {boolean|number} isDay - Whether it is daytime
 * @returns {string}
 */
export function getIconPath(conditionCode, isDay) {
  if (!conditionCode) return '';
  const folder = isDay ? 'day' : 'night';
  return `/home/${folder}/${conditionCode}.webp`;
}

/**
 * Helper to get the custom background image based on time and weather condition
 * @param {number} currentHour - Current hour (0-23)
 * @param {string} conditionText - Condition description
 * @returns {string}
 */
export function getBackgroundImage(currentHour, conditionText = '') {
  const hour = currentHour !== undefined && currentHour !== null ? currentHour : new Date().getHours();
  const condition = conditionText.toLowerCase();
  
  if (
    condition.includes('rain') ||
    condition.includes('drizzle') ||
    condition.includes('shower') ||
    condition.includes('thunder') ||
    condition.includes('sleet')
  ) {
    return '/home/bg/rainny.webp';
  }
  
  if (hour >= 5 && hour < 8) {
    return '/home/bg/sunrise.webp';
  } else if (hour >= 8 && hour < 16) {
    return '/home/bg/day.webp';
  } else if (hour >= 16 && hour < 19) {
    return '/home/bg/evening.webp';
  } else {
    return '/home/bg/night.webp';
  }
}
