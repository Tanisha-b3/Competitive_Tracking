import { useCallback, useEffect } from 'react';
import type { Contest, Notification } from '../types';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'cp-tracker-notifications';
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export function useNotifications(contests: Contest[]): UseNotificationsReturn {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    STORAGE_KEY,
    []
  );

  useEffect(() => {
    if (contests.length === 0) return;

    const upcomingContests = contests
      .filter((c) => c.startTime.getTime() - Date.now() < DAY_MS)
      .slice(0, 3);

    if (upcomingContests.length > 0 && notifications.length === 0) {
      const initialNotifications: Notification[] = upcomingContests.map((c) => ({
        id: `notif-${c.id}`,
        contestId: c.id,
        title: `${c.platform} contest starting soon`,
        message: `${c.title} starts in ${Math.floor(
          (c.startTime.getTime() - Date.now()) / HOUR_MS
        )} hours`,
        time: new Date(),
        read: false,
      }));

      setNotifications(initialNotifications);
    }
  }, [contests, notifications.length, setNotifications]);

  useEffect(() => {
    if (contests.length === 0) return;

    const checkUpcomingContests = () => {
      const now = Date.now();
      const notificationTimes = [HOUR_MS, DAY_MS, 7 * DAY_MS];

      contests.forEach((contest) => {
        const timeDiff = contest.startTime.getTime() - now;

        notificationTimes.forEach((nt) => {
          if (timeDiff > nt && timeDiff < nt + 60000) {
            const hoursUntil = Math.floor(nt / HOUR_MS);
            const existingNotification = notifications.find(
              (n) =>
                n.contestId === contest.id &&
                n.message.includes(`starts in ${hoursUntil}`)
            );

            if (!existingNotification) {
              const newNotification: Notification = {
                id: `notif-${contest.id}-${nt}`,
                contestId: contest.id,
                title: `${contest.platform} contest reminder`,
                message: `${contest.title} starts in ${hoursUntil} ${
                  hoursUntil === 1 ? 'hour' : 'hours'
                }`,
                time: new Date(),
                read: false,
              };

              setNotifications((prev) => [newNotification, ...prev]);
            }
          }
        });
      });
    };

    const interval = setInterval(checkUpcomingContests, 60000);
    return () => clearInterval(interval);
  }, [contests, notifications, setNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(
    (notificationId: string) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    },
    [setNotifications]
  );

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [setNotifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
}
