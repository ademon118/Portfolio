'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

export default function CursorProvider() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
  }, []);

  if (!enabled) return null;

  return <CustomCursor />;
}
