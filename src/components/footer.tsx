import { Copyright, GitHub, LinkedIn, Medium, Twitter } from '~/components/icons';

const socials = [
  { href: 'https://github.com/DrBarnabus', label: 'My GitHub Profile', icon: GitHub },
  { href: 'https://medium.com/@drbarnabus', label: 'My Medium Profile', icon: Medium },
  { href: 'https://twitter.com/drbarnabus', label: 'My Twitter Profile', icon: Twitter },
  { href: 'https://www.linkedin.com/in/daniel-woodward', label: 'My LinkedIn Profile', icon: LinkedIn }
] as const;

export const Footer = () => {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-4">
      <div className="max-xs:px-16 flex flex-row flex-wrap justify-center gap-4">
        {socials.map(({href, label, icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            {icon({ className: 'h-6 w-6 text-zinc-900 hover:text-accent dark:text-zinc-100 dark:hover:text-accent' })}
          </a>
        ))}
      </div>

      <div className="flex h-6 flex-row items-center justify-center space-x-1 text-zinc-600 dark:text-zinc-300">
        <Copyright className="h-3 w-3" />
        <span className="text-xs">{new Date().getFullYear()} · Daniel Woodward</span>
      </div>
    </div>
  );
};
