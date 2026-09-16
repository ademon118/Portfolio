import type { Metadata } from 'next';
import Link from 'next/link';
import { Caveat, Fraunces, Source_Serif_4 } from 'next/font/google';
import {
  BookScrap,
  DecoAsset,
  FilmStrip,
  InkPen,
  ManIcon,
  Polaroid,
  TornScrap,
} from '@/components/NotesDecorations';
import { marginScribbles, notes } from '@/lib/notes';
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
      <div className="paper-sheet">
        <div className="kraft kraft--top" aria-hidden>
          <div className="kraft-news kraft-news--left" />
          <div className="kraft-news kraft-news--right" />

          <FilmStrip className="deco deco-film" />
          <Polaroid className="deco deco-polaroid" />
          <TornScrap className="deco deco-scrap-top" />
          <DecoAsset
            src="/notes/ornate-book.png"
            className="deco deco-ornate-book"
            width={90}
            height={86}
          />
          <ManIcon className="deco deco-man" />

          <svg className="deco deco-flourish" viewBox="0 0 80 40" fill="none">
            <path
              d="M4 28c8-18 20-22 36-18 10 2 16 10 22 8 4-1 8-6 14-4"
              stroke="#1a1a1a"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M10 32c12-8 22-6 30 2"
              stroke="#1a1a1a"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <div className="deco deco-stamp">
            <span>NOTES</span>
            <small>YGN · 2026</small>
          </div>
          <div className="deco deco-postmark">POST</div>
        </div>

        <div className="lined-paper">
          <div className="paper-crease" aria-hidden />

          <DecoAsset
            src="/notes/parchment-scroll.png"
            className="deco deco-parchment-top"
            width={200}
            height={97}
          />
          <BookScrap className="deco deco-book-scrap" />
          <TornScrap className="deco deco-scrap-mid" />
          <DecoAsset
            src="/notes/compass.png"
            className="deco deco-compass"
            width={100}
            height={122}
          />
          <InkPen className="deco deco-pen" />

          <Link href="/" className="paper-back">
            ← back to portfolio
          </Link>

          <div className="paper-center-title">
            <p className="paper-center-eyebrow">Creative</p>
            <h1>NOTES</h1>
            <p className="paper-center-sub">in code &amp; shipping</p>
            <p className="paper-center-name">Aung Ko Ko Naing</p>
          </div>

          <svg className="deco deco-waves" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden>
            <path d="M0 40 Q50 10 100 40 T200 40 T300 40 T400 40" stroke="#8b6b4a" strokeWidth="1.2" fill="none" opacity="0.45" />
            <path d="M0 52 Q50 22 100 52 T200 52 T300 52 T400 52" stroke="#8b6b4a" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M0 28 Q50 0 100 28 T200 28 T300 28 T400 28" stroke="#8b6b4a" strokeWidth="0.9" fill="none" opacity="0.25" />
          </svg>

          <svg className="deco deco-scribble" viewBox="0 0 60 40" aria-hidden>
            <path d="M5 20c5-12 12 12 18 0s12 12 18 0 10-10 14 5" stroke="#1e3a5f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="48" cy="12" r="3" stroke="#1e3a5f" strokeWidth="1.2" fill="none" />
          </svg>

          {marginScribbles.map((s) => (
            <p
              key={s.text}
              className="margin-scribble"
              style={{
                top: s.top,
                left: s.left,
                right: s.right,
                transform: `rotate(${s.rotate}deg)`,
              }}
            >
              {s.text}
            </p>
          ))}

          {notes.map((note) => (
            <article
              key={note.id}
              className={`written-note written-note--${note.style.ink ?? 'black'} written-note--${note.style.size ?? 'md'}`}
              style={{
                top: note.style.top,
                left: note.style.left,
                right: note.style.right,
                maxWidth: note.style.maxWidth,
                transform: `rotate(${note.style.rotate}deg)`,
              }}
            >
              <span className="written-note-tag">
                {note.kind === 'learning' ? '✦ learning' : '✎ behind the scenes'} · {note.date}
              </span>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </article>
          ))}

          <div className="written-notes-mobile">
            {notes.map((note) => (
              <article
                key={`m-${note.id}`}
                className={`written-note written-note--${note.style.ink ?? 'black'}`}
                style={{ transform: `rotate(${note.style.rotate * 0.4}deg)` }}
              >
                <span className="written-note-tag">
                  {note.kind === 'learning' ? '✦ learning' : '✎ behind the scenes'} · {note.date}
                </span>
                <h2>{note.title}</h2>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="kraft kraft--bottom">
          <DecoAsset
            src="/notes/stacked-books.png"
            className="deco deco-stacked-books"
            width={140}
            height={135}
          />
          <DecoAsset
            src="/notes/parchment-banner.png"
            className="deco deco-parchment-bottom"
            width={180}
            height={67}
          />
          <BookScrap className="deco deco-scrap-bottom" />

          <div className="kraft-fields">
            <p>
              <span>Name:</span> Aung Ko Ko Naing
            </p>
            <p>
              <span>Focus:</span> Flutter · Mobile · Shipping
            </p>
            <p>
              <span>Submitted to:</span> whoever is reading this page :)
            </p>
            <Link href="/#projects" className="kraft-projects-link">
              see shipped projects →
            </Link>
          </div>
          <svg className="deco deco-butterfly" viewBox="0 0 64 48" fill="none" aria-hidden>
            <circle cx="32" cy="24" r="10" stroke="#2a2a2a" strokeWidth="1.3" />
            <path d="M32 14v20M22 24h20" stroke="#2a2a2a" strokeWidth="1.2" />
            <path d="M25 17l14 14M39 17L25 31" stroke="#2a2a2a" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </main>
  );
}
