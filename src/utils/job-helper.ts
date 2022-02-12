export function convertSecondsToCronFormat(minutes: number) {
  const nHours: number = Math.floor(minutes / 60);
  const nMinutes: number = Math.floor(minutes - (nHours * 60))
  const minutesPart: string = nMinutes ? `*/${nMinutes}` : "*"
  const hoursPart: string = nHours ? `*/${nHours}` : "*"
  return `${minutesPart} ${hoursPart} * * *`
}