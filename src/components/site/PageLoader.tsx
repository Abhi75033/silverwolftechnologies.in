'use client';

import { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';

export const PageLoader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after a minimum display time so the animation is visible
    const minTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // Remove from DOM after fade animation completes
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`page-loader ${fadeOut ? 'page-loader--fade-out' : ''}`}
      aria-label="Loading"
      role="status"
    >
      {/* Background grid pattern */}
      <div className="page-loader__grid" />

      {/* Ambient glow blobs */}
      <div className="page-loader__glow page-loader__glow--1" />
      <div className="page-loader__glow page-loader__glow--2" />
      <div className="page-loader__glow page-loader__glow--3" />

      {/* Center content */}
      <div className="page-loader__center">
        {/* Orbital rings */}
        <div className="page-loader__orbit page-loader__orbit--1" />
        <div className="page-loader__orbit page-loader__orbit--2" />
        <div className="page-loader__orbit page-loader__orbit--3" />

        {/* Logo */}
        <div className="page-loader__logo-wrapper">
          <img
            src={logo.src}
            alt="Silver Wolf Technologies"
            width={72}
            height={72}
            className="page-loader__logo"
          />
        </div>
      </div>

      {/* Brand text */}
      <div className="page-loader__brand">
        <span className="page-loader__brand-name">Silver Wolf</span>
        <span className="page-loader__brand-sub">Technologies</span>
      </div>

      {/* Progress bar */}
      <div className="page-loader__progress">
        <div className="page-loader__progress-bar" />
      </div>

      {/* Screen-reader text */}
      <span className="sr-only">Loading Silver Wolf Technologies…</span>
    </div>
  );
};
