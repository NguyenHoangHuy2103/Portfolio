import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { Mail, Check, ArrowUpRight, ArrowUp } from 'lucide-react';

export function Contact() {
  const { lang } = useLanguage();
  const t = content[lang].contact;

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(t.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 border-t border-line-light dark:border-line-dark bg-slate-50/50 dark:bg-surface-darker/60">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Tag */}
        <p className="font-display font-bold text-xs uppercase tracking-widest text-blue mb-4">
          {t.tag}
        </p>

        {/* Heading */}
        <h2
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-navy dark:text-white leading-[1.15] mb-8"
          dangerouslySetInnerHTML={{ __html: t.heading }}
        />

        {/* Copy Email Button */}
        <div className="relative inline-block mb-12">
          <button
            type="button"
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark shadow-sm hover:border-blue hover:shadow-md active:scale-95 transition-all"
            aria-label="Copy email"
          >
            <div className="p-2 rounded-xl bg-blue/10 text-blue group-hover:scale-110 transition-transform">
              {copied ? <Check size={18} /> : <Mail size={18} />}
            </div>
            <span className="font-mono text-sm sm:text-base font-semibold text-navy dark:text-white">
              {t.email}
            </span>
          </button>

          {/* Copy Notice Tooltip */}
          {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-navy dark:bg-white text-white dark:text-navy text-xs font-semibold shadow-lg animate-bounce">
              {t.copyNotice}
            </span>
          )}
        </div>

        {/* Social / Contact Links */}
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-16">
          <a
            href={t.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted dark:text-muted-dark hover:text-blue transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight size={15} />
          </a>
          <a
            href={t.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted dark:text-muted-dark hover:text-blue transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={15} />
          </a>
          <a
            href={`mailto:${t.email}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted dark:text-muted-dark hover:text-blue transition-colors"
          >
            <span>Email</span>
            <ArrowUpRight size={15} />
          </a>
          <a
            href={`tel:${t.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted dark:text-muted-dark hover:text-blue transition-colors"
          >
            <span>{t.phone}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-line-light dark:border-line-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted dark:text-muted-dark">
          <span>{t.copyright}</span>
          <span className="font-mono">{t.timezone}</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 font-semibold hover:text-blue transition-colors"
          >
            <span>{t.backToTop}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
