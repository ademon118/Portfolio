'use client';

import { useEffect, useState } from 'react';

function formatLocalTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export default function LocalTimeClock({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    setTimeZone(zone);

    const tick = () => {
      setTime(formatLocalTime(new Date(), zone));
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeZone || !time) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs text-gray-500 ${className}`}>
        <span className="h-3 w-16 rounded bg-white/10 animate-pulse" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs text-gray-400 tabular-nums ${className}`}
      title={`Your local time (${timeZone})`}
    >
      {!compact && (
        <span className="max-w-[9rem] truncate text-gray-500">{timeZone}</span>
      )}
      <svg
        className="w-3.5 h-3.5 shrink-0 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 7v5l3 2" />
      </svg>
      <span className="text-gray-300">{time}</span>
    </span>
  );
}
