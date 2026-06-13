'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Slim animated top progress bar that triggers on every route change.
 * Matches the primary glow theme of Silver Wolf.
 */
export const RouteProgress = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Start progress
    setVisible(true);
    setProgress(0);

    // Rapid initial fill
    const t1 = setTimeout(() => setProgress(35), 50);
    const t2 = setTimeout(() => setProgress(65), 200);
    const t3 = setTimeout(() => setProgress(85), 400);
    const t4 = setTimeout(() => setProgress(100), 600);

    // Fade out
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return (
    <div
      className="route-progress"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div
        className="route-progress__bar"
        style={{
          width: `${progress}%`,
          transition:
            progress === 0
              ? 'none'
              : progress < 100
              ? 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
              : 'width 0.2s ease-out',
        }}
      />
    </div>
  );
};
