export type Note = {
  id: string;
  kind: 'learning' | 'behind-the-scenes';
  title: string;
  body: string;
  date: string;
  /** Desktop collage placement (percentages of the paper sheet) */
  style: {
    top: string;
    left?: string;
    right?: string;
    maxWidth: string;
    rotate: number;
    ink?: 'blue' | 'brown' | 'black';
    size?: 'sm' | 'md' | 'lg';
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
      top: '18%',
      left: '6%',
      maxWidth: '15rem',
      rotate: -6,
      ink: 'blue',
      size: 'md',
    },
  },
  {
    id: 'riverpod-habit',
    kind: 'learning',
    title: 'Riverpod — note to self',
    body: 'Keep providers small. Compose three sources — don’t dump everything into one giant notifier.',
    date: 'Jul 2026',
    style: {
      top: '14%',
      right: '5%',
      maxWidth: '13.5rem',
      rotate: 7,
      ink: 'brown',
      size: 'sm',
    },
  },
  {
    id: 'store-review',
    kind: 'behind-the-scenes',
    title: 'Store week',
    body: 'Screenshots + privacy labels > last bug. Test login: tester / tester',
    date: 'Jun 2026',
    style: {
      top: '42%',
      left: '4%',
      maxWidth: '12rem',
      rotate: -3.5,
      ink: 'black',
      size: 'sm',
    },
  },
  {
    id: 'next-perf',
    kind: 'learning',
    title: 'Next.js jank note',
    body: 'Cursor setState on every mousemove = bad. Use refs. Split islands. dynamic() the Discord widget.',
    date: 'Mar 2026',
    style: {
      top: '48%',
      right: '7%',
      maxWidth: '14rem',
      rotate: 4.5,
      ink: 'blue',
      size: 'md',
    },
  },
  {
    id: 'bilingual-ui',
    kind: 'behind-the-scenes',
    title: 'EN ↔ Myanmar',
    body: 'Burmese needs more vertical room. Design both languages first — saves a late rewrite.',
    date: 'May 2026',
    style: {
      top: '68%',
      left: '28%',
      maxWidth: '16rem',
      rotate: -2,
      ink: 'brown',
      size: 'md',
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
  { text: 'todo: polish store screenshots', top: '8%', left: '38%', rotate: -2 },
  { text: '✓ shipped to App Store', top: '36%', left: '40%', rotate: 3 },
  { text: 'remember: bilingual spacing!!', top: '78%', right: '8%', rotate: -5 },
];
