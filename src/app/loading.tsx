"use client";

import * as React from "react";

/**
 * Global Loading Skeleton Component
 * Renders an elegant, modern, glassmorphic skeleton page during route changes
 * and initial page loads. Designed to prevent layout shifts and perfectly match
 * the website's dark, premium futuristic aesthetic.
 */
export default function Loading() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col bg-background text-foreground overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Skeleton Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 space-y-16 flex-1 flex flex-col justify-center">
        
        {/* 1. Hero Area Skeleton */}
        <div className="space-y-6 max-w-3xl animate-pulse">
          {/* Small badge category skeleton */}
          <div className="h-6 w-32 bg-muted/60 rounded-full border border-border/20" />
          
          {/* Main heading skeleton lines */}
          <div className="space-y-3">
            <div className="h-10 md:h-14 w-full md:w-[85%] bg-muted rounded-xl" />
            <div className="h-10 md:h-14 w-[75%] bg-muted rounded-xl" />
          </div>
          
          {/* Description text lines */}
          <div className="space-y-2 pt-2">
            <div className="h-4 w-[90%] bg-muted/60 rounded-md" />
            <div className="h-4 w-[80%] bg-muted/60 rounded-md" />
            <div className="h-4 w-[55%] bg-muted/60 rounded-md" />
          </div>
          
          {/* Button CTAs skeleton */}
          <div className="flex flex-row items-center gap-4 pt-4">
            <div className="h-12 w-36 md:w-40 bg-primary/20 rounded-lg border border-primary/20" />
            <div className="h-12 w-28 md:w-32 bg-muted/40 rounded-lg border border-border/10" />
          </div>
        </div>

        {/* 2. Grid Section Skeleton (resembles modern Bento-hub / Services / Portfolio) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="p-6 rounded-2xl border border-border/40 bg-muted/10 backdrop-blur-sm space-y-5 flex flex-col justify-between h-[220px] animate-pulse"
              style={{
                animationDelay: `${card * 150}ms`,
              }}
            >
              <div className="space-y-4">
                {/* Icon wrapper skeleton */}
                <div className="h-12 w-12 rounded-xl bg-muted/60 border border-border/20 flex items-center justify-center" />
                
                {/* Card Title */}
                <div className="h-5 w-[60%] bg-muted rounded-md" />
                
                {/* Card description lines */}
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-muted/55 rounded" />
                  <div className="h-3.5 w-[90%] bg-muted/55 rounded" />
                </div>
              </div>
              
              {/* Card CTA arrow / link skeleton */}
              <div className="h-3 w-[25%] bg-muted/40 rounded-sm self-start" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
