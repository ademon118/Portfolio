'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ hidden = false }: { hidden?: boolean }) {
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

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="cursor-dot" />
      <div className="cursor-glow" />
      <div className="cursor-trail" />
    </div>
  );
}
