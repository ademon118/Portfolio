'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

export default function CursorProvider() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
  }, []);

  if (!enabled) return null;

  const variant = pathname?.startsWith('/notes') ? 'pen' : 'default';

  return <CustomCursor variant={variant} />;
}
