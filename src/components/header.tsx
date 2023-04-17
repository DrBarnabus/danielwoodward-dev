'use client';

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useEventListener, useSSR, useTheme } from '~/hooks';
import { Display, Sun, Moon } from './icons';

type NavItemProps = { href: string; children: React.ReactNode };
const NavItem = ({ href, children }: NavItemProps) => {
  return (
    <Link href={href}>
      <div className="inline-flex w-full items-center justify-center font-semibold">
        <div className="text-accent">{'<'}</div>
        <div className="hover:text-accent">{children}</div>
        <div className="ml-1 text-accent">{'/>'}</div>
      </div>
    </Link>
  );
};

const ThemeToggleButton = () => {
  const { isClient } = useSSR();
  const [currentTheme, toggleThemeState] = useTheme();

  if (!isClient) {
    return null;
  }

  return (
    <button title={currentTheme} onClick={toggleThemeState}>
      {currentTheme === 'device' && (
        <div>
          <Display className="h-6 w-6 text-zinc-800 hover:text-accent dark:text-zinc-200 dark:hover:text-accent" />
        </div>
      )}
      {currentTheme === 'light' && (
        <div>
          <Sun className="h-6 w-6 text-zinc-800 hover:text-accent dark:text-zinc-200 dark:hover:text-accent" />
        </div>
      )}
      {currentTheme === 'dark' && (
        <div>
          <Moon className="h-6 w-6 text-zinc-800 hover:text-accent dark:text-zinc-200 dark:hover:text-accent" />
        </div>
      )}
    </button>
  );
};

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEventListener(typeof document !== 'undefined' ? document : null, 'scroll', () => {
    setScrollTop(document.documentElement.scrollTop);
  });

  return (
    <div
      ref={headerRef}
      className={cx(
        'flex flex-row items-center justify-between px-4 text-zinc-700 backdrop-blur transition-[padding,background-color] duration-300 ease-in-out dark:text-zinc-50 sm:px-8',
        headerRef.current && scrollTop > 16 ? 'bg-slate-500/20 py-2' : 'bg-transparent py-8'
      )}
    >
      <nav className="flex h-8 flex-row items-center space-x-2 text-sm sm:space-x-4 sm:text-base">
        <NavItem href="/">
          DanielWoodward <span className="hidden sm:inline">{`aka={'DrBarnabus'}`}</span>
        </NavItem>
        <NavItem href="/posts">Posts</NavItem>
      </nav>
      <div className="ml-auto flex h-8 flex-row items-center justify-end space-x-1">
        <ThemeToggleButton />
      </div>
    </div>
  );
};
