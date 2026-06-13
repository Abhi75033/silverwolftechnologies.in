"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import pLms from "@/assets/portfolio-lms.png";
import pAttendance from "@/assets/portfolio-attendance.png";
import pCrm from "@/assets/portfolio-crm.png";
import pHr from "@/assets/portfolio-hr.png";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string; // thumbnail for video
};

type WorkItem = {
  media: MediaItem[];
  title: string;
  category: string;
  result: string;
};

const work: WorkItem[] = [
  {
    media: [
      { type: "image", src: pLms.src },
    ],
    title: "Smart LMS",
    category: "Learning Management System",
    result: "21-table architecture, offline-to-online enrollment, auto-certificates",
  },
  {
    media: [
      { type: "image", src: pAttendance.src },
    ],
    title: "Attendance Management System",
    category: "Enterprise HR Solution",
    result: "Geo-fencing, biometric integration, 5,000+ employees managed",
  },
  {
    media: [
      { type: "image", src: pCrm.src },
    ],
    title: "SalesForge CRM",
    category: "Custom CRM Platform",
    result: "Kanban pipelines, lead scoring, 40% faster sales cycle",
  },
  {
    media: [
      { type: "image", src: pHr.src },
    ],
    title: "HR Portal & Employee Management",
    category: "Enterprise HR Platform",
    result: "Leave workflows, payroll integration, birthday notifications",
  },
];

/* ---------- Single Card with multi-media support ---------- */
const PortfolioCard = ({ item }: { item: WorkItem }) => {
  const [activeMedia, setActiveMedia] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = item.media[activeMedia];

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article className="group rounded-2xl overflow-hidden glass hover:border-primary/40 transition-all duration-500 h-full flex flex-col">
      {/* Media area */}
      <div className="aspect-[16/10] overflow-hidden relative bg-secondary/30">
        {current.type === "image" ? (
          <img
            src={current.src}
            alt={`${item.title} — ${item.category}`}
            width={800}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={current.src}
              poster={current.poster}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Play className="h-4 w-4 text-primary-foreground ml-0.5" />
                )}
              </div>
            </button>
            {/* Live Demo badge */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 glass rounded-full px-2 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-medium uppercase tracking-wider">Live Demo</span>
            </div>
          </>
        )}

        {/* Media dots — only when card has multiple images/videos */}
        {item.media.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {item.media.map((m, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveMedia(idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeMedia
                    ? "bg-primary w-4"
                    : "bg-white/50 hover:bg-white/80 w-1.5"
                }`}
                aria-label={`Show ${m.type} ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">{item.category}</p>
            <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
        </div>
        <p className="text-xs text-gradient-primary font-medium mt-2">{item.result}</p>
      </div>
    </article>
  );
};

/* ---------- Sliding Carousel showing 3 cards at a time ---------- */
export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // How many cards visible at once per breakpoint
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);
  const maxIndex = Math.max(0, work.length - visibleCount);

  useEffect(() => {
    setVisibleCount(getVisibleCount());
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((p) => (p >= maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((p) => (p <= 0 ? maxIndex : p - 1));
  }, [maxIndex]);

  const pauseTemporarily = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, goNext]);

  const slidePercent = (activeIndex / work.length) * 100;

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4">
              Recent <span className="text-gradient">launches.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground max-w-md hidden md:block text-sm">
              A small slice from 200+ projects shipped — websites, apps, CRMs and full digital ecosystems.
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => { goPrev(); pauseTemporarily(); }}
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => { goNext(); pauseTemporarily(); }}
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding track */}
        <div
          className="overflow-hidden rounded-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${slidePercent}%)`,
              width: `${(work.length / visibleCount) * 100}%`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {work.map((w) => (
              <div
                key={w.title}
                className="px-2 first:pl-0 last:pr-0"
                style={{ width: `${100 / work.length}%` }}
              >
                <PortfolioCard item={w} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveIndex(idx); pauseTemporarily(); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex
                  ? "w-8 bg-primary"
                  : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
