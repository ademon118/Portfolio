/** Scrapbook decorations for /notes — explorer / journal theme (no flowers) */

export function FilmStrip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 200" fill="none" aria-hidden>
      <rect width="56" height="200" rx="2" fill="#1a1a1a" />
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} fill="#2e2e2e">
          <rect x="2" y={4 + i * 16} width="6" height="10" rx="1" />
          <rect x="48" y={4 + i * 16} width="6" height="10" rx="1" />
        </g>
      ))}
      {[
        ['#6b5a4a', 8],
        ['#4a5a6b', 44],
        ['#5a4a3a', 80],
        ['#3a4a3a', 116],
        ['#4a3a4a', 152],
      ].map(([fill, y], i) => (
        <g key={fill as string}>
          <rect x="12" y={y as number} width="32" height="28" fill={fill as string} />
          <text
            x="28"
            y={(y as number) + 18}
            textAnchor="middle"
            fill="#d4c4b0"
            fontSize="5"
            fontFamily="serif"
          >
            {`0${i + 1}`}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Polaroid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 100" aria-hidden>
      <defs>
        <linearGradient id="notesPolaroidGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b49a" />
          <stop offset="100%" stopColor="#6a5a4a" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="78" height="88" fill="#f3efe6" stroke="#d8d0c0" strokeWidth="1" />
      <rect x="10" y="10" width="66" height="58" fill="#8a7a68" />
      <rect x="10" y="10" width="66" height="58" fill="url(#notesPolaroidGrad)" opacity="0.55" />
      <text
        x="43"
        y="82"
        textAnchor="middle"
        fill="#5c4a38"
        fontSize="8"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        ship day
      </text>
      <rect
        x="22"
        y="1"
        width="42"
        height="10"
        fill="#fff8dc"
        fillOpacity="0.55"
        stroke="#c8bea0"
        strokeWidth="0.5"
        transform="rotate(-2 43 6)"
      />
    </svg>
  );
}

export function TornScrap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 70" aria-hidden>
      <path
        d="M4 8 L128 2 L136 18 L132 58 L120 66 L18 64 L2 50 Z"
        fill="#efe6d4"
        stroke="#d9cbb0"
        strokeWidth="1"
      />
      <text x="16" y="28" fill="#6b5538" fontSize="9" fontFamily="Georgia, serif" opacity="0.7">
        build · ship · learn
      </text>
      <text x="16" y="42" fill="#6b5538" fontSize="8" fontFamily="Georgia, serif" opacity="0.55">
        scraps from the desk
      </text>
      <text x="16" y="54" fill="#8a7355" fontSize="7" fontFamily="Georgia, serif" opacity="0.45">
        yangon · flutter · notes
      </text>
    </svg>
  );
}

export function BookScrap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 55" aria-hidden>
      <path
        d="M2 10 C20 2, 40 14, 58 6 C78 0, 95 12, 118 8 L116 42 C100 50, 80 38, 62 46 C42 52, 22 40, 4 48 Z"
        fill="#e8dfc8"
        stroke="#cfc3a8"
        strokeWidth="0.8"
      />
      <text x="12" y="22" fill="#5a4a35" fontSize="6.5" fontFamily="Georgia, serif" opacity="0.55">
        notes from the shipping desk —
      </text>
      <text x="12" y="32" fill="#5a4a35" fontSize="6.5" fontFamily="Georgia, serif" opacity="0.5">
        craft of apps, notifications,
      </text>
      <text x="12" y="42" fill="#5a4a35" fontSize="6.5" fontFamily="Georgia, serif" opacity="0.45">
        and late-night commits.
      </text>
    </svg>
  );
}

/** Simple man / developer bust — ink sketch style */
export function ManIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 80" fill="none" aria-hidden>
      <circle cx="32" cy="22" r="12" stroke="#4a3424" strokeWidth="2.2" />
      <path
        d="M14 72c2-18 10-28 18-28s16 10 18 28"
        stroke="#4a3424"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M22 20c2-6 6-9 10-9s8 3 10 9"
        stroke="#4a3424"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M26 26h4M34 26h4" stroke="#4a3424" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M28 32c2 2 6 2 8 0" stroke="#4a3424" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Ink pen — writing tool */
export function InkPen({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 72" fill="none" aria-hidden>
      <path d="M10 4 L14 4 L16 48 L12 68 L8 48 Z" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="1" />
      <path d="M9 48 L15 48" stroke="#c4a574" strokeWidth="1.5" />
      <path d="M11 8 L13 8 L13.5 20 L10.5 20 Z" fill="#5c4030" />
      <path d="M12 68 L10 58 L14 58 Z" fill="#1a1a1a" />
    </svg>
  );
}

export function DecoAsset({
  src,
  className,
  width,
  height,
}: {
  src: string;
  className?: string;
  width: number;
  height: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      className={className}
      draggable={false}
      aria-hidden
    />
  );
}
