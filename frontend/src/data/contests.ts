import type { Contest, Difficulty, Platform } from '../types';

const CONTEST_TYPES: Record<Platform, string[]> = {
  Codeforces: ['Round'],
  CodeChef: ['Starters', 'Cook-Off', 'Lunchtime'],
  LeetCode: ['Weekly', 'Biweekly'],
};

const randomDifficulty = (): Difficulty => {
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
};

const generateCodeforcesContests = (count: number): Contest[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `cf-${1000 + i}`,
    title: `Codeforces Round #${1000 + i}`,
    platform: 'Codeforces' as Platform,
    startTime: new Date(Date.now() + i * 2 * 24 * 60 * 60 * 1000),
    duration: (2 + Math.random() * 2).toFixed(1),
    url: `https://codeforces.com/contests/${1000 + i}`,
    description: `Round #${1000 + i} of Codeforces competitive programming contest. Div 1 + Div 2 combined.`,
    difficulty: randomDifficulty(),
  }));

const generateCodeChefContests = (count: number): Contest[] =>
  Array.from({ length: count }, (_, i) => {
    const type = CONTEST_TYPES.CodeChef[i % 3];
    const typeCode = ['START', 'COOK', 'LTCH'][i % 3];
    return {
      id: `cc-${i + 100}`,
      title: `CodeChef ${type} ${i + 100}`,
      platform: 'CodeChef' as Platform,
      startTime: new Date(Date.now() + i * 1.5 * 24 * 60 * 60 * 1000),
      duration: (3 + Math.random() * 3).toFixed(1),
      url: `https://www.codechef.com/${typeCode}${i + 100}`,
      description: `${type} contest for all skill levels.`,
      difficulty: randomDifficulty(),
    };
  });

const generateLeetCodeContests = (count: number): Contest[] =>
  Array.from({ length: count }, (_, i) => {
    const type = CONTEST_TYPES.LeetCode[i % 2];
    return {
      id: `lc-${i + 200}`,
      title: `LeetCode ${type} Contest ${i + 200}`,
      platform: 'LeetCode' as Platform,
      startTime: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000),
      duration: (1.5 + Math.random()).toFixed(1),
      url: 'https://leetcode.com/contest/',
      description: `${type} programming contest with algorithmic challenges.`,
      difficulty: randomDifficulty(),
    };
  });

export const generateMockContests = (): Contest[] => [
  ...generateCodeforcesContests(30),
  ...generateCodeChefContests(40),
  ...generateLeetCodeContests(30),
];
