import type { Notification } from '../types';
import { formatTime } from '../utils/time';

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationDropdown({
  notifications,
  unreadCount,
  isOpen,
  onToggle,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDropdownProps) {
  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        className="icon-btn relative"
        onClick={onToggle}
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-bounce-soft">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={onToggle}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-80 glass overflow-hidden z-50 animate-scale-in origin-top-right">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-surface-800 dark:text-surface-100">Notifications</h3>
              </div>
              {unreadCount > 0 && (
                <button
                  className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors"
                  onClick={onMarkAllAsRead}
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Content */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <>
                  {notifications.slice(0, 5).map((notification, index) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={onMarkAsRead}
                      index={index}
                    />
                  ))}
                  {notifications.length > 5 && (
                    <div className="p-3 text-center border-t border-surface-200 dark:border-surface-700">
                      <button className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors">
                        View all {notifications.length} notifications
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                    <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <p className="text-surface-600 dark:text-surface-300 font-medium">All caught up!</p>
                  <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">No new notifications</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  index: number;
}

function NotificationItem({ notification, onMarkAsRead, index }: NotificationItemProps) {
  const time = new Date(notification.time);

  return (
    <button
      className={`w-full text-left px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-all duration-200 border-l-4 animate-fade-in ${
        !notification.read
          ? 'bg-brand-50/50 dark:bg-brand-900/20 border-l-brand-500'
          : 'border-l-transparent'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex justify-between items-start gap-2">
        <span className={`font-medium text-sm ${
          !notification.read
            ? 'text-surface-800 dark:text-surface-100'
            : 'text-surface-600 dark:text-surface-300'
        }`}>
          {notification.title}
        </span>
        <span className="text-xs text-surface-400 dark:text-surface-500 shrink-0">
          {formatTime(time)}
        </span>
      </div>
      <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 line-clamp-2">
        {notification.message}
      </p>

      {/* Unread indicator */}
      {!notification.read && (
        <div className="flex items-center gap-1 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">New</span>
        </div>
      )}
    </button>
  );
}
