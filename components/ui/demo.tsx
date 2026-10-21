import {
  User,
  FolderGit2,
  Terminal,
  Trophy,
  Mail,
  FileText,
  SunMoon,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Giới thiệu',
    icon: (
      <User className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#about',
  },
  {
    title: 'Dự án',
    icon: (
      <FolderGit2 className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#projects',
  },
  {
    title: 'Kỹ năng',
    icon: (
      <Terminal className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#skills',
  },
  {
    title: 'Thành tích',
    icon: (
      <Trophy className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#accomplishments',
  },
  {
    title: 'Liên hệ',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#contact',
  },
  {
    title: 'Xem CV',
    icon: (
      <FileText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: 'cv.html',
  },
  {
    title: 'Giao diện',
    icon: (
      <SunMoon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
];

export function AppleStyleDock() {
  return (
    <div className='fixed bottom-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock className='items-end pb-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl'>
        {data.map((item, idx) => (
          <a key={idx} href={item.href} className="outline-none">
            <DockItem className='aspect-square rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors'>
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </a>
        ))}
      </Dock>
    </div>
  );
}

export default AppleStyleDock;
