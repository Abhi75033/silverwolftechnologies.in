'use client';

import { useRef, useCallback } from 'react';

interface Use3DTiltOptions {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export function use3DTilt<T extends HTMLElement = HTMLDivElement>({
  maxTilt = 12,
  scale = 1.03,
  perspective = 1000,
}: Use3DTiltOptions = {}) {
  const cardRef = useRef<T | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      const mouseXPercent = (x / rect.width) * 100;
      const mouseYPercent = (y / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${mouseXPercent}%`);
      card.style.setProperty('--mouse-y', `${mouseYPercent}%`);
      card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [maxTilt, scale, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }, [perspective]);

  return {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
  };
}
