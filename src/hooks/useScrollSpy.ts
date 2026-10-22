import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 140) {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;

      // Bottom reached -> contact
      if (innerHeight + scrollY >= scrollHeight - 60) {
        setActiveId('contact');
        return;
      }

      // Top near hero
      if (scrollY <= 120) {
        setActiveId('hero');
        return;
      }

      // Check each section top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveId(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
