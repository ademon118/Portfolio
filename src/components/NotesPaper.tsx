'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
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

const springSoft = { type: 'spring' as const, stiffness: 120, damping: 18 };

export default function NotesPaper() {
  const reduceMotion = useReducedMotion();

  const enter = (delay = 0) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { ...springSoft, delay },
        };

  return (
    <div className="paper-sheet">
      <motion.div
        className="kraft kraft--top"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { ...springSoft, delay: 0.05 }}
      >
        <div className="kraft-news kraft-news--left" />
        <div className="kraft-news kraft-news--right" />

        <motion.div
          className="deco-motion deco-film-wrap"
          initial={reduceMotion ? false : { opacity: 0, rotate: -28, y: -12 }}
          animate={{ opacity: 1, rotate: -18, y: 0 }}
          transition={reduceMotion ? undefined : { ...springSoft, delay: 0.2 }}
        >
          <FilmStrip className="deco deco-film deco-in-wrap" />
        </motion.div>

        <motion.div
          className="deco-motion deco-polaroid-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8, rotate: 18 }}
          animate={{ opacity: 1, scale: 1, rotate: 8 }}
          transition={reduceMotion ? undefined : { ...springSoft, delay: 0.28 }}
        >
          <Polaroid className="deco deco-polaroid deco-in-wrap" />
        </motion.div>

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
        <motion.div
          className="deco deco-stamp"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7, rotate: 18 }}
          animate={{ opacity: 1, scale: 1, rotate: 8 }}
          transition={reduceMotion ? undefined : { ...springSoft, delay: 0.35 }}
        >
          <span>NOTES</span>
          <small>YGN · 2026</small>
        </motion.div>
        <div className="deco deco-postmark">POST</div>
      </motion.div>

      <div className="lined-paper">
        <div className="paper-crease" aria-hidden />

        <motion.div
          {...enter(0.25)}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0.88, y: [0, -5, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : { opacity: { delay: 0.25 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }
          }
          className="deco-motion deco-parchment-top-wrap"
        >
          <DecoAsset
            src="/notes/parchment-scroll.png"
            className="deco deco-parchment-top deco-in-wrap"
            width={200}
            height={97}
          />
        </motion.div>

        <BookScrap className="deco deco-book-scrap" />
        <TornScrap className="deco deco-scrap-mid" />

        <motion.div
          className="deco-motion deco-compass-wrap"
          animate={reduceMotion ? undefined : { rotate: [-10, -6, -10] }}
          transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <DecoAsset
            src="/notes/compass.png"
            className="deco deco-compass deco-in-wrap"
            width={100}
            height={122}
          />
        </motion.div>

        <motion.div
          className="deco-motion deco-pen-wrap"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0.85, y: [0, 6, 0], rotate: [32, 36, 32] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  opacity: { delay: 0.4 },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                }
          }
        >
          <InkPen className="deco deco-pen deco-in-wrap" />
        </motion.div>

        <DecoAsset
          src="/notes/parchment-banner.png"
          className="deco deco-parchment-float"
          width={160}
          height={60}
        />
        <ManIcon className="deco deco-man-paper" />
        <Polaroid className="deco deco-polaroid-paper" />

        <svg className="deco deco-pin deco-pin--1" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="7" fill="#c45c5c" opacity="0.85" />
          <circle cx="12" cy="12" r="3" fill="#f7f3e8" opacity="0.5" />
        </svg>
        <svg className="deco deco-pin deco-pin--2" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="7" fill="#3d6b8a" opacity="0.8" />
          <circle cx="12" cy="12" r="3" fill="#f7f3e8" opacity="0.45" />
        </svg>
        <svg className="deco deco-pin deco-pin--3" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="7" fill="#8a6b3d" opacity="0.85" />
          <circle cx="12" cy="12" r="3" fill="#f7f3e8" opacity="0.45" />
        </svg>

        <motion.div {...enter(0.15)}>
          <Link href="/" className="paper-back">
            ← back to portfolio
          </Link>
        </motion.div>

        <motion.div
          className="paper-center-title"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { ...springSoft, delay: 0.18 }}
        >
          <p className="paper-center-eyebrow">Creative</p>
          <h1>NOTES</h1>
          <p className="paper-center-sub">in code &amp; shipping</p>
          <p className="paper-center-name">Aung Ko Ko Naing</p>
        </motion.div>

        <svg className="deco deco-waves" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0 40 Q50 10 100 40 T200 40 T300 40 T400 40"
            stroke="#8b6b4a"
            strokeWidth="1.2"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M0 52 Q50 22 100 52 T200 52 T300 52 T400 52"
            stroke="#8b6b4a"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0 28 Q50 0 100 28 T200 28 T300 28 T400 28"
            stroke="#8b6b4a"
            strokeWidth="0.9"
            fill="none"
            opacity="0.25"
          />
        </svg>

        <svg className="deco deco-scribble" viewBox="0 0 60 40" aria-hidden>
          <path
            d="M5 20c5-12 12 12 18 0s12 12 18 0 10-10 14 5"
            stroke="#1e3a5f"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="48" cy="12" r="3" stroke="#1e3a5f" strokeWidth="1.2" fill="none" />
        </svg>

        {marginScribbles.map((s, i) => (
          <motion.p
            key={s.text}
            className="margin-scribble"
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
            }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 0.55, rotate: s.rotate }}
            transition={reduceMotion ? undefined : { delay: 0.55 + i * 0.12, duration: 0.4 }}
          >
            {s.text}
          </motion.p>
        ))}

        {notes.map((note, i) => (
          <motion.article
            key={note.id}
            className={`written-note written-note--${note.style.ink ?? 'black'} written-note--${note.style.size ?? 'md'} written-note--tape-${note.style.tape ?? 'clear'}`}
            style={{
              top: note.style.top,
              left: note.style.left,
              right: note.style.right,
              maxWidth: note.style.maxWidth,
            }}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    scale: 0.9,
                    rotate: note.style.rotate - 10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: note.style.rotate,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.05,
                    y: -6,
                    rotate: note.style.rotate + 1.5,
                    zIndex: 12,
                    boxShadow: '3px 14px 28px rgba(60, 40, 20, 0.22)',
                  }
            }
            transition={{
              ...springSoft,
              delay: reduceMotion ? 0 : 0.35 + i * 0.1,
            }}
          >
            <span className="note-tape" aria-hidden />
            <span className="written-note-tag">
              {note.kind === 'learning' ? '✦ learning' : '✎ behind the scenes'} · {note.date}
            </span>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
          </motion.article>
        ))}

        <div className="written-notes-mobile">
          {notes.map((note, i) => (
            <motion.article
              key={`m-${note.id}`}
              className={`written-note written-note--${note.style.ink ?? 'black'} written-note--tape-${note.style.tape ?? 'clear'}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, rotate: note.style.rotate * 0.55 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...springSoft, delay: reduceMotion ? 0 : i * 0.06 }}
            >
              <span className="note-tape" aria-hidden />
              <span className="written-note-tag">
                {note.kind === 'learning' ? '✦ learning' : '✎ behind the scenes'} · {note.date}
              </span>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.footer
        className="paper-footer kraft kraft--bottom"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={springSoft}
      >
        <DecoAsset
          src="/notes/stacked-books.png"
          className="deco deco-stacked-books"
          width={140}
          height={135}
        />
        <div className="paper-footer-fields">
          <p>
            <span>Name:</span> Aung Ko Ko Naing
          </p>
          <p>
            <span>Focus:</span> Flutter · Mobile · Shipping
          </p>
          <Link href="/#projects" className="kraft-projects-link">
            see shipped projects →
          </Link>
        </div>
      </motion.footer>
    </div>
  );
}
