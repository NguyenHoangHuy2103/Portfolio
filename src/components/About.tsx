import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { GraduationCap, Briefcase, Globe, Target } from 'lucide-react';

export function About() {
  const { lang } = useLanguage();
  const t = content[lang].about;

  return (
    <section id="about" className="py-20 border-t border-line-light dark:border-line-dark">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display font-bold text-sm text-blue tracking-widest">{t.tag}</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white">
            {t.title}
          </h2>
        </div>

        {/* Lede intro */}
        <p
          className="text-lg sm:text-xl text-muted dark:text-muted-dark leading-relaxed max-w-3xl mb-12"
          dangerouslySetInnerHTML={{ __html: t.lede }}
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Education */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue/10 text-blue">
                  <GraduationCap size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-navy dark:text-white">
                  {t.cards.education.title}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted-dark">
                {t.cards.education.time}
              </span>
            </div>
            <p
              className="text-sm text-muted dark:text-muted-dark leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.cards.education.body }}
            />
          </div>

          {/* 2. Experience */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue/10 text-blue">
                  <Briefcase size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-navy dark:text-white">
                  {t.cards.experience.title}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted-dark">
                {t.cards.experience.time}
              </span>
            </div>
            <p
              className="text-sm text-muted dark:text-muted-dark leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.cards.experience.body }}
            />
          </div>

          {/* 3. Languages */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-blue/10 text-blue">
                <Globe size={20} />
              </div>
              <h3 className="font-display font-bold text-lg text-navy dark:text-white">
                {t.cards.languages.title}
              </h3>
            </div>
            <div className="space-y-2.5">
              {t.cards.languages.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-navy dark:text-white">{item.name}</span>
                  <span className="text-xs text-muted dark:text-muted-dark">{item.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Goal */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-blue/10 text-blue">
                <Target size={20} />
              </div>
              <h3 className="font-display font-bold text-lg text-navy dark:text-white">
                {t.cards.goal.title}
              </h3>
            </div>
            <p
              className="text-sm text-muted dark:text-muted-dark leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.cards.goal.body }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
