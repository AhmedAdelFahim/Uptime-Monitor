export function convertSecondsToCronFormat(interval: string) {
  const intervalNumber = Number(`${interval[0]}${interval[1]}`);
  const intervalUnit = interval[2];
  const minutesPart: string = intervalUnit === "m" ? `*/${intervalNumber}` : "*"
  const hoursPart: string = intervalUnit === "h" ? `*/${intervalNumber}` : "*"
  return `${minutesPart} ${hoursPart} * * *`
}