const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const getTimeRemaining = (startTime: Date): string => {
  const now = new Date();
  const diff = startTime.getTime() - now.getTime();

  if (diff <= 0) return 'Started';

  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((diff % HOUR_MS) / (60 * 1000));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const isContestSoon = (startTime: Date): boolean => {
  const diff = startTime.getTime() - Date.now();
  return diff > 0 && diff < DAY_MS;
};

export const formatDate = (date: Date): string => date.toLocaleDateString();

export const formatTime = (date: Date): string =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const formatDateTime = (date: Date): string =>
  `${formatDate(date)}, ${formatTime(date)}`;
