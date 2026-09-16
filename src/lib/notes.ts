export type Note = {
  id: string;
  kind: 'learning' | 'behind-the-scenes';
  title: string;
  body: string;
  date: string;
  /** Desktop collage placement on the full paper sheet */
  style: {
    top: string;
    left?: string;
    right?: string;
    maxWidth: string;
    rotate: number;
    ink?: 'blue' | 'brown' | 'black';
    size?: 'sm' | 'md' | 'lg';
    tape?: 'amber' | 'mint' | 'clear';
  };
};

export const notes: Note[] = [
  {
    id: 'fcm-edunburgh',
    kind: 'behind-the-scenes',
    title: 'Shipping push for Edunburgh',
    body: 'FCM was the last mile — status, engineer replies, payment checks. Tap a notif → open the right screen, not just home.',
    date: 'Aug 2026',
    style: {
      top: '16%',
      left: '5%',
      maxWidth: '16rem',
      rotate: -5.5,
      ink: 'blue',
      size: 'md',
      tape: 'amber',
    },
  },
  {
    id: 'riverpod-habit',
    kind: 'learning',
    title: 'Riverpod — note to self',
    body: 'Keep providers small. Compose three sources — don’t dump everything into one giant notifier.',
    date: 'Jul 2026',
    style: {
      top: '12%',
      right: '6%',
      maxWidth: '14.5rem',
      rotate: 6.5,
      ink: 'brown',
      size: 'sm',
      tape: 'mint',
    },
  },
  {
    id: 'store-review',
    kind: 'behind-the-scenes',
    title: 'Store week',
    body: 'Screenshots + privacy labels > last bug. Test login: tester / tester',
    date: 'Jun 2026',
    style: {
      top: '44%',
      left: '7%',
      maxWidth: '13rem',
      rotate: -3,
      ink: 'black',
      size: 'sm',
      tape: 'clear',
    },
  },
  {
    id: 'next-perf',
    kind: 'learning',
    title: 'Next.js jank note',
    body: 'Cursor setState on every mousemove = bad. Use refs. Split islands. dynamic() the Discord widget.',
    date: 'Mar 2026',
    style: {
      top: '46%',
      right: '8%',
      maxWidth: '15rem',
      rotate: 4,
      ink: 'blue',
      size: 'md',
      tape: 'amber',
    },
  },
  {
    id: 'bilingual-ui',
    kind: 'behind-the-scenes',
    title: 'EN ↔ Myanmar',
    body: 'Burmese needs more vertical room. Design both languages first — saves a late rewrite.',
    date: 'May 2026',
    style: {
      top: '58%',
      left: '26%',
      maxWidth: '17rem',
      rotate: -2.5,
      ink: 'brown',
      size: 'md',
      tape: 'mint',
    },
  },
];

export const marginScribbles: Array<{
  text: string;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
}> = [
  { text: 'todo: polish store screenshots', top: '7%', left: '36%', rotate: -2 },
  { text: '✓ shipped to App Store', top: '38%', left: '42%', rotate: 3 },
  { text: 'remember: bilingual spacing!!', top: '70%', right: '10%', rotate: -5 },
];
