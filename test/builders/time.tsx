export const today = new Date();
const oneDayInMs = 24 * 60 * 60 * 1000;

export const todayAt = (
  hours: number,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) => {
  return new Date(today).setHours(hours, minutes, seconds, milliseconds);
};

export const tomorrow = new Date(today.getTime() + oneDayInMs);
export const tomorrowAt = (
  hours: number,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) => {
  return new Date(tomorrow).setHours(hours, minutes, seconds, milliseconds);
};
