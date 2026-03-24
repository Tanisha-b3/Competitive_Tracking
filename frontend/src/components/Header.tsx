import type { Stats, ViewMode, Notification } from '../types';
import { ViewToggle } from './ViewToggle';
import { NotificationDropdown } from './NotificationDropdown';
import { StatsBar } from './StatsBar';

interface HeaderProps {
  stats: Stats;
  viewMode: ViewMode;
  notifications: Notification[];
  unreadCount: number;
  showNotifications: boolean;
  darkMode: boolean;
  onViewModeChange: (mode: ViewMode) => void;
  onToggleNotifications: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onToggleDarkMode: () => void;
}

export function Header({
  stats,
  viewMode,
  notifications,
  unreadCount,
  showNotifications,
  darkMode,
  onViewModeChange,
  onToggleNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header className="mb-10">
      {/* Main header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500 via-purple-500 to-pink-500 opacity-0 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Contest</span>
              <span className="text-gray-900 dark:text-gray-100">Tracker</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live tracking across all platforms
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-offset-gray-900"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <NotificationDropdown
            notifications={notifications}
            unreadCount={unreadCount}
            isOpen={showNotifications}
            onToggle={onToggleNotifications}
            onMarkAsRead={onMarkAsRead}
            onMarkAllAsRead={onMarkAllAsRead}
          />
        </div>
      </div>

      <StatsBar stats={stats} />
    </header>
  );
}