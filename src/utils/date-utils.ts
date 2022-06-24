function getRandomDateRange(start: Date, end: Date): Date {
  const startMilli = start.getTime();
  const endMilli = end.getTime();
  const randomMilli = Math.random() * (endMilli - startMilli) + startMilli;
  return new Date(randomMilli);
}

export function getRandomDate() {
  return getRandomDateRange(new Date(1900, 1, 1), new Date(2099, 12, 31));
}
