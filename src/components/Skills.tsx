import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export function Skills() {
  const { lang } = useLanguage();
  const t = content[lang].skills;

  return (
    <section id="skills" className="py-20 border-t border-line-light dark:border-line-dark">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-display font-bold text-sm text-blue tracking-widest">{t.tag}</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white">
            {t.title}
          </h2>
        </div>

        {/* Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.groups.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-display font-bold text-lg text-navy dark:text-white mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-navy dark:text-slate-200 font-medium hover:bg-blue/15 hover:text-blue transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
