import React, { useState } from 'react';
import {
  Home,
  User,
  FolderKanban,
  Terminal,
  Trophy,
  MessageSquare,
  FileText,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { cn } from '@/lib/utils';
import { RippleText } from '@/components/ui/RippleText';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const t = content[lang].nav;

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navItems = [
    { id: 'hero', label: t.home, icon: Home, href: '#hero' },
    { id: 'about', label: t.about, icon: User, href: '#about' },
    { id: 'projects', label: t.projects, icon: FolderKanban, href: '#projects' },
    { id: 'skills', label: t.skills, icon: Terminal, href: '#skills' },
    /* Bật lại Thành tích khi cần:
    { id: 'accomplishments', label: t.accomplishments, icon: Trophy, href: '#accomplishments' },
    */
    { id: 'contact', label: t.contact, icon: MessageSquare, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 14;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }
    if (window.history.pushState) {
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center py-3.5 px-4 md:px-5 pointer-events-none transition-all duration-300">
      <nav
        className={cn(
          'pointer-events-auto flex items-center justify-between gap-1.5 md:gap-3',
          'w-full max-w-[1060px] h-[52px] px-2.5 py-1.5 rounded-full',
          'bg-white/90 dark:bg-[#0A192D]/90 backdrop-blur-xl',
          'border border-line-light dark:border-line-dark',
          'shadow-[0_8px_30px_-4px_rgba(4,44,83,0.12),0_2px_6px_rgba(4,44,83,0.05)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)]',
          'transition-colors duration-300'
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Left: Logo NHH. with Lucian #205 Ripple Effect */}
        <div className="min-w-fit md:min-w-[110px] flex items-center">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className={cn(
              'inline-flex items-center h-[38px] px-2.5 rounded-full',
              'font-display font-bold text-base md:text-[1.05rem]',
              'hover:bg-blue/10 active:scale-95 transition-all'
            )}
            aria-label="NHH - Về đầu trang"
          >
            <RippleText
              text="NHH."
              amp={12}
              sig={20}
              initialWaveDelay={800}
              dotAccent
            />
          </a>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-[22px] bg-line-light dark:bg-line-dark shrink-0" aria-hidden="true" />

        {/* Center: Navigation Tabs with Hover & Active Expansion */}
        <div
          className="flex items-center justify-center gap-1 shrink-0 overflow-x-auto no-scrollbar"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelfHovered = hoveredTab === item.id;
            const isAnyHovered = hoveredTab !== null;
            const isActive = activeSection === item.id;

            // An item is expanded if it is hovered, OR if it is active and no other item is hovered
            const isExpanded = isSelfHovered || (isActive && !isAnyHovered);

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => setHoveredTab(item.id)}
                className={cn(
                  'relative inline-flex items-center justify-center h-[38px] rounded-full whitespace-nowrap select-none shrink-0 transition-all duration-300',
                  isExpanded
                    ? 'bg-blue/10 dark:bg-blue/15 text-blue dark:text-blue-light px-3 sm:px-3.5'
                    : 'bg-transparent text-muted dark:text-muted-dark hover:text-navy dark:hover:text-white px-2.5'
                )}
                aria-label={item.label}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={cn(
                    'shrink-0 transition-colors duration-200',
                    isExpanded ? 'text-blue dark:text-blue-light' : 'currentColor'
                  )}
                />
                <span
                  className={cn(
                    'overflow-hidden whitespace-nowrap font-sans font-semibold text-xs sm:text-[0.82rem] transition-all duration-300',
                    isExpanded ? 'max-w-[130px] opacity-100 ml-1.5 sm:ml-2' : 'max-w-0 opacity-0 ml-0 pointer-events-none'
                  )}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-[1px] h-[22px] bg-line-light dark:bg-line-dark shrink-0" aria-hidden="true" />

        {/* Right: Actions (CV, Theme, EN) */}
        <div className="min-w-fit md:min-w-[110px] flex items-center justify-end gap-1 sm:gap-1.5 shrink-0">
          {/* CV Link */}
          <a
            href="cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden sm:inline-flex items-center gap-1.5 h-9 px-2.5 rounded-full',
              'text-xs font-display font-bold text-muted dark:text-muted-dark hover:text-navy dark:hover:text-white hover:bg-blue/10 active:scale-95 transition-all'
            )}
            title="Xem CV"
            aria-label="Xem CV"
          >
            <FileText size={15} />
            <span>{t.cv}</span>
          </a>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              'inline-flex items-center justify-center w-9 h-9 rounded-full',
              'text-muted dark:text-muted-dark hover:text-navy dark:hover:text-white hover:bg-blue/10 active:scale-95 transition-all'
            )}
            aria-label={t.themeToggle}
            title={t.themeToggle}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className={cn(
              'inline-flex items-center justify-center h-9 min-w-[40px] px-2.5 rounded-full',
              'border border-line-light dark:border-line-dark',
              'font-display font-bold text-xs tracking-wider text-muted dark:text-muted-dark hover:text-navy dark:hover:text-white hover:border-blue active:scale-95 transition-all'
            )}
            aria-label="Switch Language"
          >
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
        </div>
      </nav>
    </header>
  );
}
