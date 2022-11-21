export const getCountdown = (totalSeconds: number) => {
  // Get number of full minutes
  const minutes = Math.floor(totalSeconds / 60);

  // Get remainder of seconds
  const seconds = totalSeconds % 60;

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  // Format as MM:SS
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

  return result;
};
