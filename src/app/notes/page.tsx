import type { Metadata } from 'next';
import { Caveat, Fraunces, Source_Serif_4 } from 'next/font/google';
import NotesPaper from '@/components/NotesPaper';
import './notes.css';

export const metadata: Metadata = {
  title: 'Notes | Aung Ko Ko Naing',
  description:
    'A paper journal of learning notes and behind-the-scenes from shipping mobile apps.',
};

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-notes-display',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-notes-body',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-notes-hand',
  weight: ['400', '500', '600', '700'],
});

export default function NotesPage() {
  return (
    <main className={`notes-page ${fraunces.variable} ${sourceSerif.variable} ${caveat.variable}`}>
      <NotesPaper />
    </main>
  );
}
