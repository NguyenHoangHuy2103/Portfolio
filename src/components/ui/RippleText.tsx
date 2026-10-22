/* Lucian UX/UI Prompt #205 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#205 */
import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface RippleTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  amp?: number;
  sig?: number;
  initialWaveDelay?: number;
  triggerWaveOnClick?: boolean;
  dotAccent?: boolean;
}

interface LetterItem {
  el: HTMLSpanElement;
  x: number;
  y: number;
  v: number;
  isDot: boolean;
}

export function RippleText({
  text,
  className,
  letterClassName,
  amp = 26,
  sig = 34,
  initialWaveDelay = 400,
  triggerWaveOnClick = true,
  dotAccent = true,
}: RippleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<LetterItem[]>([]);
  const pxRef = useRef<number | null>(null);
  const pulseRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    lettersRef.current.forEach((l) => {
      const rect = l.el.getBoundingClientRect();
      l.x = rect.left - containerLeft + rect.width / 2;
    });
  }, []);

  const g = useCallback((d: number, s: number) => {
    return Math.exp(-(d * d) / (2 * s * s));
  }, []);

  const tick = useCallback((now: number) => {
    rafRef.current = 0;
    if (!containerRef.current) return;

    let moving = false;
    let pc: number | null = null;

    if (pulseRef.current !== null) {
      const k = (now - pulseRef.current) / 1000;
      if (k >= 1) {
        pulseRef.current = null;
      } else {
        const width = containerRef.current.offsetWidth || 300;
        pc = -60 + (width + 120) * k;
      }
    }

    const currentAmp = amp;
    const currentSig = sig;
    const px = pxRef.current;

    lettersRef.current.forEach((l) => {
      let tgt = 0;
      if (px !== null) {
        tgt -= currentAmp * g(l.x - px, currentSig);
      }
      if (pc !== null) {
        tgt -= currentAmp * 1.35 * g(l.x - pc, currentSig * 1.2);
      }

      l.v += (tgt - l.y) * 0.16;
      l.v *= 0.8;
      l.y += l.v;

      if (Math.abs(l.v) > 0.02 || Math.abs(tgt - l.y) > 0.05) {
        moving = true;
      }

      const t = Math.min(1, Math.max(0, -l.y / (currentAmp * 1.2 || 30)));
      l.el.style.setProperty('--y', `${l.y.toFixed(2)}px`);
      l.el.style.setProperty(
        '--sy',
        (1 + Math.max(-0.08, Math.min(0.14, -l.v * 0.02))).toFixed(3)
      );
      l.el.style.setProperty('--t', t.toFixed(3));
    });

    if (moving || pulseRef.current !== null || pxRef.current !== null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [amp, sig, g]);

  const kick = useCallback(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!rafRef.current && !rm) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const sendWave = useCallback(() => {
    measure();
    pulseRef.current = performance.now();
    kick();
  }, [measure, kick]);

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pxRef.current = e.clientX - rect.left;
    kick();
  };

  const handlePointerLeave = () => {
    pxRef.current = null;
    kick();
  };

  const handleClick = () => {
    if (triggerWaveOnClick) {
      sendWave();
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Collect letter elements
    const letterEls = containerRef.current.querySelectorAll<HTMLSpanElement>('.u205-l');
    lettersRef.current = Array.from(letterEls).map((el) => ({
      el,
      x: 0,
      y: 0,
      v: 0,
      isDot: el.dataset.dot === 'true',
    }));

    measure();

    const handleResize = () => measure();
    window.addEventListener('resize', handleResize, { passive: true });

    let initialTimer: NodeJS.Timeout;
    if (initialWaveDelay >= 0) {
      initialTimer = setTimeout(() => {
        sendWave();
      }, initialWaveDelay);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [text, measure, sendWave, initialWaveDelay]);

  // Split into words so words wrap cleanly on mobile
  const words = text.split(' ');

  return (
    <span
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={cn(
        'u205-wd inline-flex flex-wrap items-baseline select-none cursor-pointer',
        className
      )}
      role="img"
      aria-label={text}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="inline-flex items-baseline whitespace-nowrap overflow-visible"
        >
          {wIdx > 0 && <span className="inline-block w-[0.28em]">&nbsp;</span>}
          {Array.from(word).map((char, cIdx) => {
            const isDot = char === '.';
            return (
              <span
                key={cIdx}
                data-dot={isDot ? 'true' : 'false'}
                className={cn(
                  'u205-l relative inline-block leading-none font-inherit tracking-inherit will-change-transform',
                  isDot && dotAccent && 'text-blue',
                  letterClassName
                )}
                aria-hidden="true"
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
