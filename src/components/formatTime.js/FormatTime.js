export const FormatTime = (timestamp) => {
  const Times = new Date(timestamp);
  const hours = Times.getHours();
  const minutes = Times.getMinutes();
  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  } else {
    return `${hours}:${minutes}`;
  }
};
