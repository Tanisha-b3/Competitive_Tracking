import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Contest, Filters, Platform } from '../types';
import { generateMockContests } from '../data/contests';

const HOUR_MS = 60 * 60 * 1000;

interface UseContestsReturn {
  contests: Contest[];
  filteredContests: Contest[];
  loading: boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  platforms: Platform[];
  refresh: () => void;
}

export function useContests(): UseContestsReturn {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    platform: 'all',
    timeframe: 'all',
    search: '',
  });

  const fetchContests = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setContests(generateMockContests());
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  const filteredContests = useMemo(() => {
    return contests
      .filter((contest) => {
        if (filters.platform !== 'all' && contest.platform !== filters.platform) {
          return false;
        }

        const timeDiffHours =
          (contest.startTime.getTime() - Date.now()) / HOUR_MS;

        if (filters.timeframe === 'today' && timeDiffHours > 24) return false;
        if (filters.timeframe === 'week' && timeDiffHours > 168) return false;
        if (filters.timeframe === 'month' && timeDiffHours > 720) return false;

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          return (
            contest.title.toLowerCase().includes(searchLower) ||
            contest.platform.toLowerCase().includes(searchLower)
          );
        }

        return true;
      })
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }, [contests, filters]);

  const platforms = useMemo(
    () => [...new Set(contests.map((c) => c.platform))],
    [contests]
  );

  return {
    contests,
    filteredContests,
    loading,
    filters,
    setFilters,
    platforms,
    refresh: fetchContests,
  };
}
