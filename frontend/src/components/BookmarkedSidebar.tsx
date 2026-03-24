import type { Contest, Platform } from '../types';
import { PLATFORM_LOGOS } from '../types';
import { getTimeRemaining, isContestSoon, formatDateTime } from '../utils/time';

interface BookmarkedSidebarProps {
  contests: Contest[];
  bookmarkedIds: string[];
  onRemoveBookmark: (id: string) => void;
}

const getPlatformConfig = (platform: Platform) => {
  const config: Record<Platform, { text: string; bg: string; border: string }> = {
    Codeforces: {
      text: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/40',
      border: 'border-l-blue-500',
    },
    CodeChef: {
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/40',
      border: 'border-l-emerald-500',
    },
    LeetCode: {
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/40',
      border: 'border-l-amber-500',
    },
  };
  return config[platform];
};

export function BookmarkedSidebar({
  contests,
  bookmarkedIds,
  onRemoveBookmark,
}: BookmarkedSidebarProps) {
  const bookmarkedContests = contests
    .filter((c) => bookmarkedIds.includes(c.id))
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Bookmarked
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your saved contests</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          {bookmarkedIds.length} saved
        </span>
      </div>

      {bookmarkedContests.length > 0 ? (
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-4 min-w-min">
            {bookmarkedContests.map((contest, index) => (
              <div key={`bm-${contest.id}`} className="flex-shrink-0 w-80">
                <BookmarkedContestItem
                  contest={contest}
                  onRemove={onRemoveBookmark}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-200 font-semibold mb-1">No bookmarks yet</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Bookmark contests to track them here
          </p>
        </div>
      )}
    </div>
  );
}

interface BookmarkedContestItemProps {
  contest: Contest;
  onRemove: (id: string) => void;
  index: number;
}

function BookmarkedContestItem({
  contest,
  onRemove,
  index,
}: BookmarkedContestItemProps) {
  const timeRemaining = getTimeRemaining(contest.startTime);
  const soon = isContestSoon(contest.startTime);
  const platformConfig = getPlatformConfig(contest.platform);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-4 group border-l-4 ${platformConfig.border} hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 border-l-transparent`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Platform badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <img
              src={PLATFORM_LOGOS[contest.platform]}
              alt=""
              className="w-3.5 h-3.5"
            />
            <span className={`text-xs font-medium ${platformConfig.text}`}>
              {contest.platform}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-1 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {contest.title}
          </h4>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDateTime(contest.startTime)}</span>
          </div>

          {/* Time remaining */}
          <div className={`flex items-center gap-1.5 text-xs mt-2 font-medium ${
            soon ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
          }`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{timeRemaining}</span>
          </div>
        </div>

        {/* Remove button */}
        <button
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0"
          onClick={() => onRemove(contest.id)}
          title="Remove bookmark"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}