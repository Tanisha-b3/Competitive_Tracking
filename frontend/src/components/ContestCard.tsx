import type { Contest, Platform } from '../types';
import { PLATFORM_LOGOS, DIFFICULTY_COLORS } from '../types';
import { getTimeRemaining, isContestSoon, formatDateTime } from '../utils/time';

interface ContestCardProps {
  contest: Contest;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const getPlatformBadgeClass = (platform: Platform): string => {
  const classes: Record<Platform, string> = {
    Codeforces: 'bg-blue-100 text-blue-800',
    CodeChef: 'bg-green-100 text-green-800',
    LeetCode: 'bg-yellow-100 text-yellow-800',
  };
  return classes[platform];
};

export function ContestCard({
  contest,
  isBookmarked,
  onToggleBookmark,
}: ContestCardProps) {
  const timeRemaining = getTimeRemaining(contest.startTime);
  const soon = isContestSoon(contest.startTime);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${contest.platform}`}>
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <img
            src={PLATFORM_LOGOS[contest.platform]}
            alt={contest.platform}
            className="w-6 h-6 object-contain"
          />
          <span className="text-sm font-medium text-gray-600">{contest.platform}</span>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h5 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{contest.title}</h5>
            <p className="text-sm text-gray-500 line-clamp-2">{contest.description}</p>
          </div>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onClick={() => onToggleBookmark(contest.id)}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <DifficultyBadge difficulty={contest.difficulty} />
          <TimeRemaining time={timeRemaining} isSoon={soon} />
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <small className="text-xs text-gray-500">
            {formatDateTime(contest.startTime)}
          </small>
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export function ContestListItem({
  contest,
  isBookmarked,
  onToggleBookmark,
}: ContestCardProps) {
  const timeRemaining = getTimeRemaining(contest.startTime);
  const soon = isContestSoon(contest.startTime);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 mb-3">
      <div className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-md ${getPlatformBadgeClass(
                  contest.platform
                )}`}
              >
                {contest.platform}
              </span>
              <h5 className="text-base font-semibold text-gray-900">{contest.title}</h5>
              <div className="ml-0 sm:ml-2">
                <DifficultyBadge difficulty={contest.difficulty} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2 line-clamp-1">
              {contest.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <p className="text-gray-600">
                <strong className="font-medium text-gray-700">Starts:</strong>{' '}
                {contest.startTime.toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium text-gray-700">Duration:</strong> {contest.duration} hours
              </p>
              <p className="text-gray-600">
                <TimeRemaining time={timeRemaining} isSoon={soon} />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BookmarkButton
              isBookmarked={isBookmarked}
              onClick={() => onToggleBookmark(contest.id)}
            />
            <a
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
}

function BookmarkButton({ isBookmarked, onClick }: BookmarkButtonProps) {
  return (
    <button
      className={`text-2xl transition-colors duration-200 focus:outline-none ${
        isBookmarked 
          ? 'text-yellow-500 hover:text-yellow-600' 
          : 'text-gray-400 hover:text-yellow-500'
      }`}
      onClick={onClick}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? '★' : '☆'}
    </button>
  );
}

interface DifficultyBadgeProps {
  difficulty: Contest['difficulty'];
}

function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const colorMap: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  const colorClass = colorMap[difficulty] || DIFFICULTY_COLORS[difficulty] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md ${colorClass}`}>
      {difficulty}
    </span>
  );
}

interface TimeRemainingProps {
  time: string;
  isSoon: boolean;
}

function TimeRemaining({ time, isSoon }: TimeRemainingProps) {
  return (
    <span className={`text-xs font-medium ${isSoon ? 'text-orange-600' : 'text-gray-500'}`}>
      <svg className="inline-block w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {time}
    </span>
  );
}