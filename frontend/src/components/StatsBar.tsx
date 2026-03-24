import type { Stats } from '../types';

interface StatsBarProps {
  stats: Stats;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
      {/* Tracking stat */}
      <StatCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        label="Tracking"
        value={`${stats.totalContests}+`}
        subtext="contests"
        gradient="from-brand-500 to-purple-600"
        shadowColor="shadow-brand-500/30"
        index={0}
      />

      {/* Engagement stat */}
      <StatCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        }
        label="Engagement"
        value={`${stats.bookmarkedPercentage}%`}
        subtext="bookmarked"
        gradient="from-emerald-500 to-teal-600"
        shadowColor="shadow-emerald-500/30"
        valueColor="text-emerald-600 dark:text-emerald-400"
        trend="up"
        index={1}
      />

      {/* Performance stat */}
      <StatCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
        label="Performance"
        value={`${stats.performanceImprovement}%`}
        subtext="improved"
        gradient="from-amber-500 to-orange-600"
        shadowColor="shadow-amber-500/30"
        valueColor="text-amber-600 dark:text-amber-400"
        trend="up"
        index={2}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  gradient: string;
  shadowColor: string;
  valueColor?: string;
  trend?: 'up' | 'down';
  index: number;
}

function StatCard({
  icon,
  label,
  value,
  subtext,
  gradient,
  shadowColor,
  valueColor = 'text-surface-800 dark:text-surface-100',
  trend,
  index,
}: StatCardProps) {
  return (
    <div
      className="glass px-5 py-4 flex items-center gap-4 group hover:scale-[1.02] transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg ${shadowColor} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-surface-500 dark:text-surface-400 font-medium uppercase tracking-wider">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <p className={`text-2xl font-bold ${valueColor} tabular-nums`}>
            {trend && (
              <span className="text-sm mr-1">
                {trend === 'up' ? '↑' : '↓'}
              </span>
            )}
            {value}
          </p>
          <span className="text-xs text-surface-400 dark:text-surface-500">{subtext}</span>
        </div>
      </div>

      {/* Decorative arrow on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-surface-300 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
