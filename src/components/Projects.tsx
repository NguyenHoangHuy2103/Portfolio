import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Projects() {
  const { lang } = useLanguage();
  const t = content[lang].projects;

  return (
    <section id="projects" className="py-20 border-t border-line-light dark:border-line-dark">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-display font-bold text-sm text-blue tracking-widest">{t.tag}</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white">
            {t.title}
          </h2>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 gap-6">
          {t.items.map((proj) => {
            const isProduction = proj.badge === 'Production';
            const isResearch = proj.badge === 'Research';

            return (
              <div
                key={proj.id}
                className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-display font-bold text-sm text-blue">{proj.num}</span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-navy dark:text-white">
                        {proj.name}
                      </h3>
                      <span
                        className={cn(
                          'text-xs font-semibold px-2.5 py-0.5 rounded-full',
                          isProduction
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                            : isResearch
                            ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted-dark'
                        )}
                      >
                        {proj.badge}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted-dark font-mono font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* External Live Link */}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start px-4 py-2 rounded-full bg-blue/10 hover:bg-blue text-blue hover:text-white font-display font-semibold text-xs transition-colors shrink-0"
                    >
                      <span>{proj.linkText}</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-base text-muted dark:text-muted-dark leading-relaxed mb-3">
                  {proj.desc}
                </p>

                {/* Extra info / role */}
                {proj.extra && (
                  <p
                    className="text-xs sm:text-sm text-navy2 dark:text-slate-300 font-medium leading-relaxed p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60"
                    dangerouslySetInnerHTML={{ __html: proj.extra }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
