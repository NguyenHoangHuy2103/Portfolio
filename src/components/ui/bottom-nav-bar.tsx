"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  FolderGit2,
  Terminal,
  Trophy,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Giới thiệu", icon: User, href: "#about" },
  { label: "Dự án", icon: FolderGit2, href: "#projects" },
  { label: "Kỹ năng", icon: Terminal, href: "#skills" },
  { label: "Thành tích", icon: Trophy, href: "#accomplishments" },
  { label: "Liên hệ", icon: MessageCircle, href: "#contact" },
];

const MOBILE_LABEL_WIDTH = 84;

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = true,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "bg-card/90 dark:bg-card/90 backdrop-blur-md border border-border dark:border-sidebar-border rounded-full flex items-center p-2 shadow-xl space-x-1 min-w-[320px] max-w-[95vw] h-[54px] z-50",
        stickyBottom && "fixed inset-x-0 bottom-5 mx-auto w-fit",
        className,
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.a
            key={item.label}
            href={item.href}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px] no-underline cursor-pointer",
              isActive
                ? "bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary gap-2"
                : "bg-transparent text-muted-foreground dark:text-muted-foreground hover:bg-muted dark:hover:bg-muted",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            )}
            onClick={() => setActiveIndex(idx)}
            aria-label={item.label}
          >
            <Icon
              size={20}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200 shrink-0"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "6px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="overflow-hidden flex items-center max-w-[88px]"
            >
              <span
                className={cn(
                  "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis leading-tight",
                  isActive ? "text-primary dark:text-primary font-semibold" : "opacity-0",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
