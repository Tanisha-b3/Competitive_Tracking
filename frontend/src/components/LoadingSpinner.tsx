export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      {/* Main spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-surface-200 dark:border-surface-700" />

        {/* Spinning gradient ring */}
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-transparent border-t-brand-500 border-r-purple-500 animate-spin" />

        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 animate-pulse-soft shadow-lg shadow-brand-500/30" />
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-surface-700 dark:text-surface-200 font-semibold text-lg">
          Loading Contests
        </p>
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
          Aggregating from multiple platforms...
        </p>
      </div>

      {/* Platform indicators */}
      <div className="flex items-center gap-4 mt-6">
        <LoadingPlatform
          name="Codeforces"
          color="bg-blue-500"
          delay={0}
        />
        <LoadingPlatform
          name="CodeChef"
          color="bg-emerald-500"
          delay={200}
        />
        <LoadingPlatform
          name="LeetCode"
          color="bg-amber-500"
          delay={400}
        />
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

interface LoadingPlatformProps {
  name: string;
  color: string;
  delay: number;
}

function LoadingPlatform({ name, color, delay }: LoadingPlatformProps) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 animate-pulse-soft"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs font-medium text-surface-600 dark:text-surface-400">
        {name}
      </span>
    </div>
  );
}
