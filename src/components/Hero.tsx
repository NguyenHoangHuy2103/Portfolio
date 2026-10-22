import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { useTypewriter } from '@/hooks/useTypewriter';

export function Hero() {
  const { lang } = useLanguage();
  const t = content[lang].hero;

  const typewriterText = useTypewriter(['Backend Developer', 'Frontend Developer', 'DevOps']);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 14;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Name */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-navy dark:text-white leading-[1.15]">
              Nguyễn Hoàng Huy<span className="text-blue">.</span>
            </h1>

            {/* Eyebrow */}
            <p className="mt-2.5 font-display font-medium text-xs sm:text-sm tracking-wider uppercase text-muted dark:text-muted-dark">
              {t.eyebrow}
            </p>

            {/* Status Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.status}</span>
            </div>

            {/* Typewriter Line */}
            <div className="mt-4 h-8 flex items-center font-display font-bold text-xl sm:text-2xl text-blue">
              <span>{typewriterText}</span>
              <span className="inline-block w-[2px] h-6 ml-1 bg-blue animate-pulse" />
            </div>

            {/* Role / Motto */}
            <p className="mt-4 text-base sm:text-lg text-muted dark:text-muted-dark leading-relaxed max-w-2xl whitespace-pre-line italic">
              "{t.role}"
            </p>

            {/* Facts Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-2xl">
              {t.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm"
                >
                  <p className="font-display font-bold text-sm text-navy dark:text-white">{fact.title}</p>
                  <p className="text-xs text-muted dark:text-muted-dark mt-0.5">{fact.sub}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="px-6 py-3 rounded-full bg-blue hover:bg-blue-600 text-white font-display font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                {t.ctaProjects}
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="px-6 py-3 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-surface-dark border border-line-light dark:border-line-dark text-navy dark:text-white font-display font-semibold text-sm active:scale-95 transition-all"
              >
                {t.ctaContact}
              </button>
            </div>
          </div>

          {/* Right: Avatar Placeholder / Photo */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-line-light dark:border-line-dark bg-slate-100 dark:bg-surface-dark shadow-xl flex items-center justify-center p-2">
              <img
                src="YOUR_PHOTO.jpg"
                alt="Nguyễn Hoàng Huy"
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const ph = document.getElementById('avatar-placeholder');
                  if (ph) ph.style.display = 'flex';
                }}
              />
              <div
                id="avatar-placeholder"
                className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue/10 via-slate-100 to-blue/20 dark:from-blue/10 dark:via-surface-dark dark:to-blue/20"
              >
                <span className="font-display font-bold text-5xl text-navy dark:text-white tracking-tight">NHH</span>
                <span className="text-xs text-muted dark:text-muted-dark mt-2 font-medium">{t.avatarHint}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
