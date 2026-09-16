'use client';

import { useEffect, useRef, useState } from 'react';

type CursorVariant = 'default' | 'pen';

export default function CustomCursor({
  hidden = false,
  variant = 'default',
}: {
  hidden?: boolean;
  variant?: CursorVariant;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);

  useEffect(() => {
    const syncFormFocus = () => {
      setIsFormFocused(document.body.classList.contains('contact-form-focus'));
    };

    syncFormFocus();
    const observer = new MutationObserver(syncFormFocus);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const isHidden = hidden || isFormFocused;

  useEffect(() => {
    if (isHidden) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [isHidden]);

  if (isHidden) return null;

  const isPen = variant === 'pen';

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isPen ? 'custom-cursor--pen' : ''} ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: 0,
        top: 0,
        transform: isPen ? 'translate(-2px, -28px)' : 'translate(-50%, -50%)',
      }}
    >
      {isPen ? (
        <svg className="cursor-pen" viewBox="0 0 32 48" width="28" height="42" aria-hidden>
          <path
            d="M14 2 L18 2 L22 30 L16 46 L10 30 Z"
            fill="#2a2118"
            stroke="#1a1410"
            strokeWidth="1"
          />
          <path d="M12 28 L20 28" stroke="#c4a574" strokeWidth="1.6" />
          <path d="M13.5 5 L18.5 5 L19.2 16 L12.8 16 Z" fill="#5c4030" />
          <path d="M16 46 L13.2 34 L18.8 34 Z" fill="#0f0f0f" />
          <path d="M16 46 L14.5 42" stroke="#1e3a5f" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>
      ) : (
        <>
          <div className="cursor-dot" />
          <div className="cursor-glow" />
          <div className="cursor-trail" />
        </>
      )}
    </div>
  );
}
