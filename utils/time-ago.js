export function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const secondsAgo = Math.floor((now - past) / 1000);

  // Define intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  // Find the appropriate interval
  for (let unit in intervals) {
    const value = Math.floor(secondsAgo / intervals[unit]);
    
    if (value >= 1) {
      return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
    }
  }

  return "just now";
}