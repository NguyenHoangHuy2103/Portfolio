import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const current = window.pageYOffset || h.scrollTop || document.body.scrollTop;
      setProgress((current / total) * 100);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2.5px] bg-blue z-50 transition-[width] duration-75 pointer-events-none"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
