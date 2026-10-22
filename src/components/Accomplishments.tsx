import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { Trophy } from 'lucide-react';

export function Accomplishments() {
  const { lang } = useLanguage();
  const t = content[lang].accomplishments;

  return (
    <section id="accomplishments" className="py-20 border-t border-line-light dark:border-line-dark">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-display font-bold text-sm text-blue tracking-widest">{t.tag}</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white">
            {t.title}
          </h2>
        </div>

        {/* Accomplishments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.items.map((acc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Trophy size={18} />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-navy dark:text-white">
                  {acc.title}
                </h3>
              </div>
              <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">
                {acc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
