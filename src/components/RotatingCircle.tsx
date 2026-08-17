'use client';

import { useEffect, useRef } from 'react';

export default function RotatingCircle() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const el = circleRef.current;
      if (el) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const fraction = docHeight > 0 ? window.scrollY / docHeight : 0;
        el.style.transform = `rotate(${fraction * 360}deg)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={circleRef}
      className="relative mx-auto w-full max-w-[220px] sm:max-w-[320px] md:max-w-[380px] will-change-transform mt-5 sm:mt-12"
    >
      <img
        alt="decorative circle rotating"
        className="z-10 w-full select-none rounded-full opacity-85"
        draggable="false"
        src="/decorative-circle.svg"
      />
    </div>
  );
}
