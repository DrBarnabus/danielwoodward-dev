import { Copyright, GitHub, LinkedIn } from '~/components/icons';

export const Footer = () => {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-4">
      <div className="max-xs:px-16 flex flex-row flex-wrap justify-center gap-4">
        <a href="https://github.com/DrBarnabus" target="_blank" rel="noopener noreferrer" aria-label="My GitHub">
          <GitHub className="h-6 w-6 text-zinc-900 hover:text-accent dark:text-zinc-100 dark:hover:text-accent" />
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-woodward/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="My LinkedIn"
        >
          <LinkedIn className="h-6 w-6 text-zinc-900 hover:text-accent dark:text-zinc-100 dark:hover:text-accent" />
        </a>
      </div>

      <div className="flex h-6 flex-row items-center justify-center space-x-1 text-zinc-600 dark:text-zinc-300">
        <Copyright className="h-3 w-3" />
        <span className="text-xs">{new Date().getFullYear()} · Daniel Woodward</span>
      </div>
    </div>
  );
};
