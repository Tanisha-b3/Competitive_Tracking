import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'cp-tracker-bookmarks';

interface UseBookmarksReturn {
  bookmarked: string[];
  isBookmarked: (contestId: string) => boolean;
  toggleBookmark: (contestId: string) => void;
  clearAll: () => void;
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarked, setBookmarked] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const isBookmarked = useCallback(
    (contestId: string) => bookmarked.includes(contestId),
    [bookmarked]
  );

  const toggleBookmark = useCallback(
    (contestId: string) => {
      setBookmarked((prev) =>
        prev.includes(contestId)
          ? prev.filter((id) => id !== contestId)
          : [...prev, contestId]
      );
    },
    [setBookmarked]
  );

  const clearAll = useCallback(() => {
    setBookmarked([]);
  }, [setBookmarked]);

  return { bookmarked, isBookmarked, toggleBookmark, clearAll };
}
