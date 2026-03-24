import { useState, useMemo, useEffect } from 'react';
import type { ViewMode, Stats } from './types';
import { useContests, useBookmarks, useNotifications, useLocalStorage } from './hooks';
import {
  Header,
  FilterSection,
  ContestList,
  BookmarkedSidebar,
  LoadingSpinner,
} from './components';

export default function App() {
  const {
    contests,
    filteredContests,
    loading,
    filters,
    setFilters,
    platforms,
  } = useContests();

  const { bookmarked, isBookmarked, toggleBookmark } = useBookmarks();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(contests);

  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const stats: Stats = useMemo(
    () => ({
      totalContests: contests.length,
      bookmarkedPercentage:
        contests.length > 0
          ? Math.round((bookmarked.length / contests.length) * 100 * 0.4)
          : 0,
      performanceImprovement: 50,
      unreadNotifications: unreadCount,
    }),
    [contests.length, bookmarked.length, unreadCount]
  );

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          stats={stats}
          viewMode={viewMode}
          notifications={notifications}
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          darkMode={darkMode}
          onViewModeChange={setViewMode}
          onToggleNotifications={() => setShowNotifications((prev) => !prev)}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <FilterSection
          filters={filters}
          platforms={platforms}
          onFilterChange={setFilters}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-12 animate-fade-in">
            {/* Bookmarked Section - Moved above Upcoming Contests */}
            <BookmarkedSidebar
              contests={contests}
              bookmarkedIds={bookmarked}
              onRemoveBookmark={toggleBookmark}
            />

            {/* Upcoming Contests */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
                  Upcoming Contests
                </h2>
                <span className="badge badge-primary animate-bounce-soft">
                  {filteredContests.length} found
                </span>
              </div>

              <ContestList
                contests={filteredContests}
                viewMode={viewMode}
                isBookmarked={isBookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-surface-500 text-sm">
            Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}