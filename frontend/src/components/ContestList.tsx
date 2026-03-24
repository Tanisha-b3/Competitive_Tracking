import type { Contest, ViewMode } from '../types';
import { ContestCard, ContestListItem } from './ContestCard';

interface ContestListProps {
  contests: Contest[];
  viewMode: ViewMode;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export function ContestList({
  contests,
  viewMode,
  isBookmarked,
  onToggleBookmark,
}: ContestListProps) {
  if (contests.length === 0) {
    return (
      <div className="glass p-12 text-center animate-scale-in">
        <div className="w-20 h-40 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 flex items-center justify-center">
          <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-surface-700 dark:text-surface-200 font-semibold text-lg">No contests found</p>
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-2 max-w-sm mx-auto">
          Try adjusting your search criteria or check back later for new contests
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary mt-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    );
  }

  if (viewMode === 'cards') {
    return (
      <div className="overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
          {contests.map((contest, index) => (
            <div
              key={contest.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ContestCard
                contest={contest}
                isBookmarked={isBookmarked(contest.id)}
                onToggleBookmark={onToggleBookmark}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 stagger-children">
      {contests.map((contest, index) => (
        <div
          key={contest.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <ContestListItem
            contest={contest}
            isBookmarked={isBookmarked(contest.id)}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      ))}
    </div>
  );
}
