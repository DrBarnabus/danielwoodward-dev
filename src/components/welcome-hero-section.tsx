'use client';

import Link from 'next/link';
import Typist from 'react-typist-component';

export const WelcomeHeroSection = () => {
  const statements = [
    'am a Software Developer',
    'code in C#',
    'develop full stack solutions',
    'blog about dotnet development',
    'build things for the web',
    'build web applications with Angular',
    'code in TypeScript',
    'build web applications with Next.js',
    'develop open source software',
    'blog about Next.js development',
    'code in C++',
  ];

  return (
    <section className="flex flex-col space-y-2 text-zinc-900 dark:text-zinc-50">
      <h1 className="text-balance text-2xl font-bold  drop-shadow-sm sm:text-3xl md:text-5xl">
        Hi, my name is <span className="text-accent">Daniel Woodward</span>
      </h1>

      <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-400 max-sm:h-14 sm:text-2xl md:text-3xl">
        and I{' '}
        <Typist typingDelay={80} backspaceDelay={60} loop>
          {statements.map((statement) => (
            <span key={statement}>
              {statement}.
              <Typist.Delay ms={1500} />
              <Typist.Backspace count={statement.length + 1} />
            </span>
          ))}
        </Typist>
      </h2>

      <p className="!mt-8 border-l border-accent px-6 py-3">
        I&apos;m a Full Stack Developer based in Derbyshire, UK. Currently building innovative cloud-based software
        automation solutions for the steel industry at{' '}
        <a
          href="https://www.digi-steel.com/"
          target="_blank"
          rel="noopener"
          className="text-accent no-underline hover:text-accent/80 hover:underline"
        >
          DIGI-Steel
        </a>
        .
      </p>

      <Link href="/about" className="!mt-4 self-start rounded-md bg-accent px-6 py-3">
        About me
      </Link>
    </section>
  );
};
