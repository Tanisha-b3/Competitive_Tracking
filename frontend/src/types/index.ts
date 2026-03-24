export type Platform = 'Codeforces' | 'CodeChef' | 'LeetCode';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Timeframe = 'all' | 'today' | 'week' | 'month';
export type ViewMode = 'cards' | 'list';

export interface Contest {
  id: string;
  title: string;
  platform: Platform;
  startTime: Date;
  duration: string;
  url: string;
  description: string;
  difficulty: Difficulty;
}

export interface Notification {
  id: string;
  contestId: string;
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

export interface Filters {
  platform: Platform | 'all';
  timeframe: Timeframe;
  search: string;
}

export interface Stats {
  totalContests: number;
  bookmarkedPercentage: number;
  performanceImprovement: number;
  unreadNotifications: number;
}

export const PLATFORM_LOGOS: Record<Platform, string> = {
  Codeforces: 'https://codeforces.org/s/0/favicon-32x32.png',
  CodeChef: 'https://cdn.codechef.com/favicon.ico',
  LeetCode: 'https://leetcode.com/favicon.ico',
};

export const PLATFORM_COLORS: Record<Platform, string> = {
  Codeforces: '#1E88E5',
  CodeChef: '#43A047',
  LeetCode: '#FFC107',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};
